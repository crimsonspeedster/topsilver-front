"use client";

import React, {useState} from "react";
import { Modal, Row,  Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";
import Link from "next/link";
import {ProductQuickViewObject} from "@interfaces/entities/product";
import {useTranslations} from "next-intl";
import FallbackImage from '@assets/images/fallback.png';
import Rating from "@src/components/Product/Parts/Rating";
import ProductInfo from "@src/components/Product/Parts/ProductInfo";
import ProductPurchase from "@src/components/Product/Forms/ProductPurchase";
import ProductPrices from "@src/components/Product/Parts/ProductPrices";


const ProductModal = (
    {
        product,
        cardShow,
        handleClose,
    }
    :
    {
        product: ProductQuickViewObject|null,
        cardShow: boolean,
        handleClose: (type: string) => void,
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

    const swiperParamss = {
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        spaceBetween: 30,
        slidesPerView: 1,
        pagination: {
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        fadeEffect: {
            crossFade: true,
        },
    }

    return (
        <Modal show={cardShow} onHide={()=>handleClose('quick_view')} centered size="lg">
            <Modal.Body className="p-0">
                <button
                    className="btn-close position-absolute end-0 top-0 m-2"
                    style={{ zIndex: "99" }}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={()=>handleClose('quick_view')}
                ></button>

                <Row>
                    <Col md={7}>
                        <div className="images">
                            {
                                product.gallery && product.gallery.length > 0 ?
                                    <Swiper {...swiperParamss}>
                                        {
                                            product.gallery.map((gallery, index) => (
                                                <SwiperSlide
                                                    className="topbar-product-card"
                                                    key={index}
                                                >
                                                    <div className="position-relative overflow-hidden">
                                                        <Image
                                                            src={gallery.url}
                                                            className="product-view-img w-100 object-fit-cover object-center"
                                                            alt={product.title}
                                                            width={720}
                                                            height={919}
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                    :
                                    <div
                                        className="topbar-product-card"
                                    >
                                        <div className="position-relative overflow-hidden">
                                            <Image
                                                src={product.media?.url ?? FallbackImage}
                                                className="product-view-img w-100 object-fit-cover object-center"
                                                alt={product.title}
                                                width={720}
                                                height={919}
                                            />
                                        </div>
                                    </div>
                            }
                        </div>
                    </Col>

                    <Col md={5} className="overflow-y-auto overflow-x-hidden no-scroll" style={{ height: '624px'}} >
                        <div className="pt-30 ps-4 ps-md-0 pe-4">
                            <h6 className="fs-20 mb-2">
                                <Link
                                    href={`/${product.slug}`}
                                    className="main_link"
                                    onNavigate={()=>{handleClose('quick_view')}}
                                >{product.title}</Link>
                            </h6>

                            <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                                {
                                    product.stock_status === 'in_stock' &&
                                    <ProductPrices
                                        price_formatted={formatedPrice}
                                        price_on_sale_formatted={formatedOnSalePrice}
                                        discount_percent={discountPercentage}
                                    />
                                }

                                <Rating
                                    rating={product.rating_avg}
                                    rating_count={product.rating_count}
                                />
                            </div>

                            {
                                product.short_description &&
                                <p className="text-muted">{product.short_description}</p>
                            }

                            {
                                product.stock_status === 'in_stock' ?
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
                                    :
                                    <p className="text-danger">{t('out_of_stock')}</p>
                            }

                            <ProductInfo
                                collections={product.collections}
                                categories={product.categories}
                                promotions={product.promotions}
                                sku={product.sku}
                            />

                            <div>
                                <Link
                                    href={`/${product.slug}`}
                                    className="fw-medium detail_link "
                                    onNavigate={()=>{handleClose('quick_view')}}
                                >
                                    {t('full_details')} <i className="facl facl-right ms-1"></i>
                                </Link>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    )
}
export default ProductModal