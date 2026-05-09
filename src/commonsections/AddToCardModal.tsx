"use client";

import React, { useState } from "react";
import { Modal, Button, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import {ProductQuickShopObject} from "@interfaces/entities/product";

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
        handleAddToCardModalClose: () => void,
    }
) => {
    if (!product) {
        handleAddToCardModalClose();

        return null;
    }

    const [color, setColor] = useState('Grey');
    const [size, setSize] = useState('M');
    const [quantity, setQuantity] = useState(1);

    const handleColorClick = (newColor: string) => {
        setColor(newColor);
    };

    const handleSizeClick = (newSize: string) => {
        setSize(newSize);
    };

    const handleQuantityChange = (change: number) => {
        setQuantity((prev) => Math.max(1, prev + change)); // Ensure quantity is at least 1
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(100, Number(event.target.value))); // Ensure quantity is at least 1
        setQuantity(value);
    };

    return (
        <Modal show={cardShow} onHide={handleAddToCardModalClose} centered className="fade modal-overl mx-auto quickViewModall">
            <Modal.Body>
                <span className="fs-35 close position-absolute top-0 end-0" aria-label="Close" onClick={handleAddToCardModalClose}>
                    <i className="pe-7s-close pegk"></i>
                </span>

                <Row>
                    <div className="col-4">
                        <Image
                            src={product.media.url}
                            className="img-fluid"
                            alt={product.title}
                            width={82}
                            height={105}
                        />
                    </div>

                    <div className="col-8">
                        <h6>
                            <Link className="cd chp" href={product.slug ?? ''}>
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

                                        <span className="bg-danger text-white p-1">-25%</span>
                                    </>
                                    :
                                    <div className="fs-16 me-1">
                                        <span>{product.price_formatted}</span>
                                    </div>
                            }
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        {
                            product.type === 'variable' &&
                            <div>
                                <h6 className="text-uppercase fw-bold mb-3">
                                    Color: <span>{color}</span>
                                </h6>

                                <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                    <OverlayTrigger
                                        key="tooltip-black"
                                        placement="top"
                                        overlay={<Tooltip id="tooltip-black">Black</Tooltip>}
                                    >
                                        <Link
                                            href="#!"
                                            className={`d-inline-block bg-dark rounded-circle square-xs ${color === 'Black' ? 'active' : ''} square-xs`}
                                            onClick={() => handleColorClick('Black')}
                                        ></Link>
                                    </OverlayTrigger>

                                </div>
                            </div>
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
                                Add to cart
                            </Button>
                        </div>

                        <Link href={product.slug ?? ''} className="btn fs-16 fw-semibold detail_link">
                            View full details
                            <i className="facl facl-right ms-1"></i>
                        </Link>
                    </div>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AddToCardModal;