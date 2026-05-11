"use client";

import React, { useState } from "react";
import { Modal, Button, Row,  Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from "next/image";
import Link from "next/link";
import {ProductQuickViewObject} from "@interfaces/entities/product";
import {useTranslations} from "next-intl";
import FallbackImage from '@assets/images/fallback.png';
import WishListButton from "@src/components/Product/Parts/WishListButton";
import Variations from "@src/components/Product/Parts/Variations";
import Rating from "@src/components/Product/Parts/Rating";


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
        handleClose('quick_view');

        return null;
    }

    const t = useTranslations('Product');

    const [quantity, setQuantity] = useState<number>(1);

    const handleQuantityChange = (change: number) => {
        setQuantity((prev) => Math.max(1, prev + change)); // Ensure quantity is at least 1
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(100, Number(event.target.value))); // Ensure quantity is at least 1
        setQuantity(value);
    };

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
                                product.gallery ?
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
                                <Link href={product.slug} className="main_link">{product.title}</Link>
                            </h6>

                            <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                                {
                                    product.price_on_sale_formatted ?
                                        <p className="mb-0 fs-16 text-muted flex-grow-1">
                                            <del>{product.price_formatted}</del>&nbsp;
                                            <span className="text-danger">{product.price_on_sale_formatted}</span>
                                        </p>
                                        :
                                        <p className="mb-0 fs-16 flex-grow-1">
                                            <del>{product.price_formatted}</del>
                                        </p>
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
                                product.type === 'variable' &&
                                <Variations
                                    variants={product.variant_attributes}
                                />
                            }

                            <div className="d-flex flex-wrap align-items-center gap-2 mt-4">
                                <div className="input-step border border-dark rounded-pill">
                                    <button type="button" className="minus material-shadow text-dark fw-bold" onClick={() => handleQuantityChange(-1)}>
                                        –
                                    </button>

                                    <input
                                        type="number"
                                        className="product-quantity fw-bold fs-6"
                                        value={quantity}
                                        onChange={handleChange}
                                    />

                                    <button type="button" className="plus material-shadow text-dark fw-bold" onClick={() => handleQuantityChange(1)}>
                                        +
                                    </button>
                                </div>

                                <Button variant="teal" className="text-uppercase rounded-pill min-w-150">
                                    {t('add_to_cart')}
                                </Button>

                                <WishListButton
                                    id={product.id}
                                    parentClasses='product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center leading-40'
                                />
                            </div>

                            <div className="mt-4">
                                <p className="text-muted mb-1">
                                    <span className="text-body">SKU:</span> {product.sku}
                                </p>

                                {
                                    product.categories.length > 0 &&
                                    <p className="text-muted mb-1">
                                        <span className="text-body">{t('categories')}: </span>
                                        {
                                            product.categories.map((category, index) => (
                                                <Link
                                                    key={category.id}
                                                    href={category.slug}
                                                    className="main_link text-muted"
                                                >
                                                    {category.title}
                                                    {
                                                        index < product.categories.length - 1 ?
                                                            ', '
                                                            :
                                                            null
                                                    }
                                                </Link>
                                            ))
                                        }
                                    </p>
                                }

                                {
                                    product.collections.length > 0 &&
                                    <p className="text-muted mb-1">
                                        <span className="text-body">{t('collections')}: </span>
                                        {
                                            product.collections.map((collection, index) => (
                                                <Link
                                                    key={collection.id}
                                                    href={collection.slug}
                                                    className="main_link text-muted"
                                                >
                                                    {collection.title}
                                                    {
                                                        index < product.collections.length - 1 ?
                                                            ', '
                                                            :
                                                            null
                                                    }
                                                </Link>
                                            ))
                                        }
                                    </p>
                                }
                            </div>

                            <div>
                                <Link
                                    href={product.slug}
                                    className="fw-medium detail_link "
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