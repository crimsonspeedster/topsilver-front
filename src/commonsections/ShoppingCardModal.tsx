"use client";

import { Offcanvas } from 'react-bootstrap';
import Link from 'next/link';
import {useCartStore} from "@src/store/cart-store";
import {useTranslations} from "next-intl";
import MiniCartItemProduct from "@src/components/MiniCart/MiniCartItemProduct";
import MiniCartItemBundle from "@src/components/MiniCart/MiniCartItemBundle";
import FreeShippingProgress from "@src/components/Cart/FreeShippingProgress";
import React from "react";


type Props = {
    shoppingShow: boolean,
    handleShoppingClose: ()=>void,
    free_shipping: number | null,
}

const ShoppingCardModal = (
    {
        shoppingShow,
        handleShoppingClose,
        free_shipping,
    }: Props
) => {
    const tCart = useTranslations('Cart');
    const cart = useCartStore((state) => state.cart);

    return (
        <Offcanvas show={shoppingShow} onHide={handleShoppingClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{tCart('cart')}</Offcanvas.Title>
            </Offcanvas.Header>

            {/*<div className="p-20 border-bottom border-top shadow-2xl">*/}
            {/*    <h6 className="mb-0 fw-medium fs-13 lh-base">Almost there, add <span className="text-danger">$9.00</span> more to get*/}
            {/*        <span className="text-danger"> FREE SHIPPING!</span>*/}
            {/*    </h6>*/}
            {/*</div>*/}

            <Offcanvas.Body className='p-0'>
                {
                    cart.total_qty > 0 ?
                        cart.items.map(item => {
                            if (item.type === 'bundle') {
                                return (
                                    <MiniCartItemBundle
                                        key={item.id}
                                        item={item}
                                        handleShoppingClose={handleShoppingClose}
                                    />
                                )
                            }
                            else {
                                return (
                                    <MiniCartItemProduct
                                        key={item.id}
                                        item={item}
                                        handleShoppingClose={handleShoppingClose}
                                    />
                                )
                            }
                        })
                        :
                        <p className="text-center">{tCart('nothing_found')}</p>
                }
            </Offcanvas.Body>

            {
                cart.total_qty > 0 &&
                <>
                    <FreeShippingProgress
                        free_shipping={free_shipping}
                    />

                    <div className="p-3 border-top">
                        <div className="d-flex align-items-center mb-3">
                            <h6 className="mb-0 flex-grow-1 fs-16">{tCart('subtotal')}:</h6>

                            <p className="cart_tot_price fs-18 text-reset mb-0">{cart.subtotal_formatted}</p>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <h6 className="mb-0 flex-grow-1 fs-22">{tCart('total')}:</h6>

                            <p className="cart_tot_price fs-22 text-reset mb-0">{cart.total_formatted}</p>
                        </div>

                        <div className="mt-3 vstack gap-3">
                            <Link
                                href="/cart"
                                onNavigate={handleShoppingClose}
                                className="w-100 btn btn-light text-uppercase fw-semibold"
                                style={{ fontSize: '11px' }}
                            >
                                {tCart('view_cart')}
                            </Link>

                            <Link
                                href="/checkout"
                                className="w-100 btn btn-primary text-uppercase fw-semibold"
                                style={{ fontSize: '11px' }}
                                onNavigate={handleShoppingClose}
                            >
                                {tCart('checkout')}
                            </Link>
                        </div>
                    </div>
                </>
            }
        </Offcanvas>
    )
}
export default ShoppingCardModal