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


const ProductPurchase = (
    props: ProductPurchaseProps
) => {
    const tProduct = useTranslations('Product');

    const hydrateCart = useCartStore((state) => state.hydrate);

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

            setMaxQty(
                props.manage_stock
                    ? selectedVariant.stock ?? 1
                    : 99
            );

            setIsSubmitting(false);
        } else {
            setStockStatus(props.stock_status);

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

    const parseVariantKey = (key: string) => {
        return key.split('|').reduce<Record<number, number>>((acc, pair) => {
            const [attributeId, termId] = pair.split(':').map(Number);
            acc[attributeId] = termId;

            return acc;
        }, {});
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

            toast.success(tProduct('added_to_cart'));
            hydrateCart(response.data.data);
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                const backendError = error.response.data.message;

                toast.error(backendError);
            } else {
                console.error('Unexpected error:', error);
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
                    selected={selectedTerms}
                    variants={props.variant_attributes}
                />
            }

            {
                stockStatus === 'out_of_stock' ?
                    <NotifyMe
                        product_id={props.id}
                        variant_id={variation?.id}
                    />
                    :
                    <div className="d-flex flex-wrap align-items-center gap-2">
                        <Quantity
                            value={quantity}
                            onChange={setQuantity}
                            max={maxQty}
                        />

                        <button
                            className="text-uppercase rounded-pill min-w-150"
                            disabled={isSubmitting}
                            onClick={handleBuy}
                        >
                            {tProduct('add_to_cart')}
                        </button>

                        <WishListButton
                            id={props.id}
                            parentClasses="product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center leading-40"
                        />
                    </div>
            }
        </div>
    );
}

export default ProductPurchase;