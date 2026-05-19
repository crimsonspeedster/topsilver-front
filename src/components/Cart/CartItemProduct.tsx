"use client";

import {Col, Row} from "react-bootstrap";
import Image from "next/image";
import FallbackImage from '@assets/images/fallback.png';
import {CartItemProductObject} from "@interfaces/entities/cart";
import Link from "next/link";
import CartItemRemove from "@src/components/Cart/CartItemRemove";
import Quantity from "@src/components/Product/Forms/Quantity";
import React, {useState} from "react";


type Props = {
    item: CartItemProductObject,
};

const CartItemProduct = (
    {
        item,
    }: Props
) => {
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const maxQty = item.entity.manage_stock ?
        item.product_variant?.stock ?? item.entity.stock
        :
        99;

    return (
        <Row className="g-0 border-bottom align-items-center py-3 border-bottom">
            <Col md={6}>
                <div className="d-flex gap-3 align-items-start align-items-md-center">
                    <Link
                        className=""
                        href={item.entity.slug}
                        >
                        <Image
                            src={item.entity.media?.url ?? FallbackImage}
                            width={120}
                            height={145}
                            alt={item.entity.title}
                            className="object-fit-cover object-center"
                        />
                    </Link>

                    <div className="w-100">
                        <div className="px-2 pb-2">
                            <Link
                                className="fs-16"
                                href={item.entity.slug}
                            >
                                {item.entity.title}
                            </Link>

                            <div className="mt-3">
                                <CartItemRemove />
                            </div>
                        </div>
                        <div className="border-bottom border-top border-dotted p-2 d-md-none">
                            <p className="text-muted m-0">{item.price_formatted}</p>
                        </div>

                        <div className="d-md-none my-2">
                            <Quantity
                                value={quantity}
                                onChange={setQuantity}
                                max={maxQty}
                            />
                        </div>

                        <div className="border-top border-dotted p-2 d-md-none">
                            <p className="m-0">{item.total_formatted}</p>
                        </div>
                    </div>
                </div>
            </Col>

            <Col md={6} className="justify-content-between d-none d-md-flex align-items-center">
                <p className="text-muted">{item.price_formatted}</p>

                <Quantity
                    value={quantity}
                    onChange={setQuantity}
                    max={maxQty}
                />

                <p className="text-black text-end">{item.total_formatted}</p>
            </Col>
        </Row>
    );
}

export default CartItemProduct;