"use client";

import React, { useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import {ProductQuickShopObject} from "@interfaces/entities/product";
import FallbackImage from '@assets/images/fallback.png';
import {useTranslations} from "next-intl";
import Variations from "@src/components/Product/Parts/Variations";


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
        handleAddToCardModalClose('quick_shop');

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
                    <Link href={product.slug} className="col-4">
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
                            <Link className="cd chp" href={product.slug}>
                                {product.title}
                            </Link>
                        </h6>

                        <div className="d-flex mb-2 align-items-center">
                            {
                                product.price_on_sale_formatted ?
                                    <>
                                        <div className="fs-16 me-1">
                                            <del className="text-muted">{product.price_formatted}</del>&nbsp;
                                            <span className="text-danger">{product.price_on_sale_formatted}</span>
                                        </div>

                                        <span className="bg-danger text-white p-1">-{product.discount_percent}%</span>
                                    </>
                                    :
                                    <div className="fs-16 me-1">
                                        <del>{product.price_formatted}</del>
                                    </div>
                            }
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        {
                            product.type === 'variable' &&
                            <Variations
                                variants={product.variant_attributes}
                                isTermsCentered={true}
                            />
                        }

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

                        <div className="my-3">
                            <Button type="submit" className="btn w-100 btn-teal rounded-pill text-uppercase px-4 fw-semibold">
                                {t('add_to_cart')}
                            </Button>
                        </div>

                        <Link href={product.slug} className="btn fs-16 fw-semibold detail_link">
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