"use client";

import Quantity from "@src/components/Product/Forms/Quantity";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {ProductPurchaseProps} from "@interfaces/layouts/product";
import {toast} from "react-toastify";
import axiosClient from "@lib/axiosClient";
import {CartObject} from "@interfaces/entities/cart";
import WishListButton from "@src/components/Product/Parts/WishListButton";
import Variations from "@src/components/Product/Parts/Variations";
import {ProductVariantObject} from "@interfaces/entities/product";
import NotifyMe from "@src/components/Product/NotifyMe";
import {useCartStore} from "@src/store/cart-store";
import Link from "next/link";
import BuyInOneClickPopup from "@src/components/Popups/BuyInOneClickPopup";


const ProductPurchase = (
    props: ProductPurchaseProps
) => {
    const tProduct = useTranslations('Product');

    const hydrateCart = useCartStore((state) => state.hydrate);

    const [showBuyInClickPopup, setShowBuyInClickPopup] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState(props.type === 'variable');
    const [variation, setVariation] = useState<ProductVariantObject|null>(null);
    const [stockStatus, setStockStatus] = useState<string>(props.stock_status);
    const [selectedTerms, setSelectedTerms] = useState<Record<number, number>>({});
    const [maxQty, setMaxQty] = useState<number>(
        props.manage_stock ?
            props.type === 'variable' ?
                99
                :
                props.stock ?? 1
            :
            99
    );

    const handleClosePopup = () => {
        setIsSubmitting(false);

        setShowBuyInClickPopup(false);
    }

    useEffect(() => {
        const selectedVariant = props.variants.find((variant) => {
            const parsed = parseVariantKey(variant.variant_key);

            return Object.entries(parsed).every(
                ([attributeId, termId]) =>
                    selectedTerms[Number(attributeId)] === termId
            );
        });

        setVariation(selectedVariant ?? null);

        if (selectedVariant) {
            setStockStatus(selectedVariant.stock_status);

            props.priceHandle(selectedVariant.price_formatted, selectedVariant.price_on_sale_formatted, selectedVariant.discount_percent);

            setMaxQty(
                props.manage_stock
                    ? selectedVariant.stock ?? 1
                    : 99
            );

            setIsSubmitting(false);
        } else {
            setStockStatus(props.stock_status);

            props.priceHandle(props.price_formatted, props.price_on_sale_formatted, props.discount_percent);

            setMaxQty(
                props.manage_stock
                    ? props.stock ?? 1
                    : 99
            );

            setIsSubmitting(props.type === 'variable');
        }
    }, [selectedTerms, props.variant_attributes, props.type]);

    const handleSelectTerms = (attributeId: number, termId: number) => {
        setSelectedTerms(prev => ({
            ...prev,
            [attributeId]: termId,
        }));
    };

    const checkIsTermAvailable = (attributeId: number, termId: number): boolean => {
        return props.variants.some((productVariant) => {
            const parsed = parseVariantKey(productVariant.variant_key);

            if (parsed[attributeId] !== termId) {
                return false;
            }

            return Object.entries(selectedTerms).every(
                ([selectedAttributeId, selectedTermId]) => {
                    const currentAttributeId = Number(selectedAttributeId);

                    if (currentAttributeId === attributeId) {
                        return true;
                    }

                    return parsed[currentAttributeId] === selectedTermId;
                }
            );
        });
    }

    const parseVariantKey = (key: string) => {
        return key.split('|').reduce<Record<number, number>>((acc, pair) => {
            const [attributeId, termId] = pair.split(':').map(Number);
            acc[attributeId] = termId;

            return acc;
        }, {});
    };

    const handleBuyInOneClick = async () => {
        setIsSubmitting(true);

        setShowBuyInClickPopup(true);
    };

    const handleBuy = async () => {
        if (isSubmitting)
            return;

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append('entity_type', 'product');
            formData.append('entity_id', props.id.toString());
            formData.append('quantity', quantity.toString());

            if (props.type === 'variable' && variation) {
                formData.append('product_variant_id', variation.id.toString());
            }

            const response = await axiosClient.post<{
                data: CartObject,
            }>('/cart/items', formData);

            toast.success(
                <div>
                    {tProduct('added_to_cart')} {' '}

                    <Link
                        className="btn btn-primary"
                        href="/cart"
                    >{tProduct('go_to_cart')}</Link>
                </div>
            );
            hydrateCart(response.data.data);
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                const backendError = error.response.data.message;

                toast.error(backendError);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            {
                props.type === 'variable' &&
                <Variations
                    onSelect={handleSelectTerms}
                    checkIsTermAvailable={checkIsTermAvailable}
                    selected={selectedTerms}
                    variant_attributes={props.variant_attributes}
                />
            }

            {
                stockStatus === 'out_of_stock' ?
                    <NotifyMe
                        product_id={props.id}
                    />
                    :
                    <div className="d-flex flex-wrap align-items-center gap-2">
                        <Quantity
                            value={quantity}
                            onChange={setQuantity}
                            max={maxQty}
                        />

                        <button
                            className="text-uppercase btn btn-primary"
                            disabled={isSubmitting}
                            onClick={handleBuy}
                        >
                            {tProduct('add_to_cart')}
                        </button>

                        {
                            props.showBuyInOnClick &&
                            <button
                                className="text-uppercase btn btn-teal"
                                disabled={isSubmitting}
                                onClick={handleBuyInOneClick}
                            >
                                {tProduct('buy_in_one_click')}
                            </button>

                        }

                        <WishListButton
                            id={props.id}
                            parentClasses="product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center leading-40"
                        />
                    </div>
            }

            <BuyInOneClickPopup
                productId={props.id}
                variationId={variation?.id ?? null}
                show={showBuyInClickPopup}
                handleClose={handleClosePopup}
            />
        </div>
    );
}

export default ProductPurchase;