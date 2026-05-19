"use client";

import {Col, Row} from "react-bootstrap";
import Image from "next/image";
import FallbackImage from '@assets/images/fallback.png';
import {CartItemBundleObject} from "@interfaces/entities/cart";


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
                    {/*<Image src={thumb1} alt="Thumb1Img" />*/}
                    <div className="w-100">
                        <div className="px-2 pb-2">
                            <h6 className="fs-16">Test</h6>

                            <div className="mt-3">
                                <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </div>
                        </div>
                        <div className="border-bottom border-top border-dotted p-2 d-md-none">
                            <p className="text-muted m-0">$35.00</p>
                        </div>

                        // QTY

                        <div className="border-top border-dotted p-2 d-md-none">
                            <p className="m-0">$35.00</p>
                        </div>
                    </div>
                </div>
            </Col>

            <Col md={6} className="justify-content-between d-none d-md-flex align-items-center">
                <p className="text-muted">$35.00</p>

                // QTY

                <p className="text-black text-end">$35.00</p>
            </Col>

        </Row>
    );
}

export default CartItemBundle;