"use client";

import {Col, Row} from "react-bootstrap";
import Image from "next/image";
import FallbackImage from '@assets/images/fallback.png';
import {CartItemBundleObject} from "@interfaces/entities/cart";
import CartItemRemove from "@src/components/Cart/CartItemRemove";
import React from "react";


type Props = {
    item: CartItemBundleObject,
};

const CartItemBundle = (
    {
        item,
    }: Props
) => {
    return (
        <Row className="g-0 border-bottom align-items-center py-3 border-bottom">
            <Col md={6}>
                <div className="d-flex gap-3 align-items-start align-items-md-center">
                    <div
                        className=""
                    >
                        <Image
                            src={FallbackImage}
                            width={120}
                            height={145}
                            alt={item.entity.title}
                            className="object-fit-cover object-center"
                        />
                    </div>

                    <div className="w-100">
                        <div className="px-2 pb-2">
                            <span
                                className="fs-16"
                            >
                                {item.entity.title}
                            </span>

                            {
                                item.product_variant &&
                                <p className="text-muted fs-12">
                                    {
                                        item.product_variant.attribute_terms && item.product_variant.attribute_terms.length > 0 &&
                                        item.product_variant.attribute_terms.map((attr, i) => (
                                            <span
                                                key={attr.id}
                                            >
                                        {
                                            attr.title
                                        }
                                                {
                                                    ' '
                                                }
                                    </span>
                                        ))
                                    }
                                </p>
                            }

                            <div className="mt-3">
                                <CartItemRemove
                                    id={item.id}
                                />
                            </div>
                        </div>

                        <div className="border-bottom border-top border-dotted p-2 d-md-none">
                            <p className="text-muted m-0">{item.price_formatted}</p>
                        </div>

                        <div className="border-top border-dotted p-2 d-md-none">
                            <p className="m-0">{item.total_formatted}</p>
                        </div>

                        <div className="d-md-none my-2">
                            x {item.quantity}
                        </div>
                    </div>
                </div>
            </Col>

            <Col md={6} className="justify-content-between d-none d-md-flex align-items-center">
                <p className="text-muted">{item.price_formatted}</p>

                <p className="text-muted">x {item.quantity}</p>

                <p className="text-black text-end">{item.total_formatted}</p>
            </Col>
        </Row>
    );
}

export default CartItemBundle;