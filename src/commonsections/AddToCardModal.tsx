"use client";

import React, {useState} from "react";
import { Modal, Button, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import {ProductQuickShopObject} from "@interfaces/entities/product";
import FallbackImage from '@assets/images/fallback.png';
import {useTranslations} from "next-intl";
import Variations from "@src/components/Product/Parts/Variations";
import ProductPrices from "@src/components/Product/Parts/ProductPrices";
import ProductPurchase from "@src/components/Product/Forms/ProductPurchase";


const AddToCardModal = (
    {
        product,
        cardShow,
        handleAddToCardModalClose
    }
    :
    {
        product: ProductQuickShopObject|null,
        cardShow: boolean,
        handleAddToCardModalClose: (type: string) => void,
    }
) => {
    if (!product) {
        return null;
    }

    const t = useTranslations('Product');

    const [formatedPrice, setFormatedPrice] = useState<string>(product.price_formatted);
    const [formatedOnSalePrice, setFormatedOnSalePrice] = useState<string|null>(product.price_on_sale_formatted);
    const [discountPercentage, setDiscountPercentage] = useState<number|null>(product.discount_percent);

    const priceHandle = (price: string, price_on_sale: string|null, discount_percent: number|null) => {
        setFormatedPrice(price);
        setFormatedOnSalePrice(price_on_sale);
        setDiscountPercentage(discount_percent);
    }

    return (
        <Modal show={cardShow} onHide={()=>handleAddToCardModalClose('quick_shop')} centered className="fade modal-overl mx-auto quickViewModall">
            <Modal.Body>
                <span
                    className="fs-35 close position-absolute top-0 end-0"
                    aria-label="Close"
                    onClick={()=>handleAddToCardModalClose('quick_shop')}
                >
                    <i className="pe-7s-close pegk"></i>
                </span>

                <Row>
                    <Link
                        href={`/${product.slug}`}
                        className="col-4"
                        onNavigate={()=>handleAddToCardModalClose('quick_shop')}
                    >
                        <Image
                            src={product.media ? product.media.url : FallbackImage}
                            className="img-fluid"
                            alt={product.title}
                            width={82}
                            height={105}
                        />
                    </Link>

                    <div className="col-8">
                        <h6>
                            <Link
                                className="cd chp"
                                href={`/${product.slug}`}
                                onNavigate={()=>handleAddToCardModalClose('quick_shop')}
                            >
                                {product.title}
                            </Link>
                        </h6>

                        <div className="d-flex mb-2 align-items-center">
                            <ProductPrices
                                price_formatted={formatedPrice}
                                price_on_sale_formatted={formatedOnSalePrice}
                                discount_percent={discountPercentage}
                            />
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        {
                            product.stock_status === 'in_stock' &&
                            <ProductPurchase
                                id={product.id}
                                manage_stock={product.manage_stock}
                                stock={product.stock}
                                type={product.type}
                                stock_status={product.stock_status}
                                variants={product.variants}
                                variant_attributes={product.variant_attributes}
                                priceHandle={priceHandle}
                                price_formatted={product.price_formatted}
                                price_on_sale_formatted={product.price_on_sale_formatted}
                                discount_percent={product.discount_percent}
                            />
                        }

                        <Link
                            href={`/${product.slug}`}
                            className="btn fs-16 fw-semibold detail_link"
                            onNavigate={()=>handleAddToCardModalClose('quick_shop')}
                        >
                            {t('full_details')}

                            <i className="facl facl-right ms-1"></i>
                        </Link>
                    </div>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AddToCardModal;