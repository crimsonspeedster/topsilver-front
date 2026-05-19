"use client";

import {Row} from "react-bootstrap";
import {useTranslations} from "next-intl";
import {CartItemObject} from "@interfaces/entities/cart";
import CartItemProduct from "./CartItemProduct";
import CartItemBundle from "@src/components/Cart/CartItemBundle";
import Link from "next/link";


type Props = {
    items: CartItemObject[],
    subtotal: string;
    total: string;
};

const CartTable = (
    {
        items,
        subtotal,
        total,
    }: Props
) => {
    const tCart = useTranslations('Cart');

    return (
        <section className="py-5">
            <div className="container">
                <Row className="d-none d-lg-flex  border-bottom">
                    <div className="col-6">
                        <h6>{tCart('table_name_product')}</h6>
                    </div>

                    <div className="col-2">
                        <h6>{tCart('table_name_price')}</h6>
                    </div>

                    <div className="col-2">
                        <h6 className="text-center">{tCart('table_name_qty')}</h6>
                    </div>

                    <div className="col-2">
                        <h6 className="text-end">{tCart('table_name_total')}</h6>
                    </div>
                </Row>

                {
                    items.map(item => {
                        if (item.type === 'bundle') {
                            return (
                                <CartItemBundle
                                    key={item.id}
                                    item={item}
                                />
                            )
                        }
                        else {
                            return (
                                <CartItemProduct
                                    key={item.id}
                                    item={item}
                                />
                            )
                        }
                    })
                }

                <div className="text-end offset-md-6 col-md-6 mt-4">
                    <h6>{tCart('subtotal')}: {subtotal}</h6>

                    <h5>{tCart('total')}: {total}</h5>

                    <Link
                        href="/checkout"
                        className="btn btn-teal text-white px-5 py-2 rounded-pill mb-3"
                    >
                        {tCart('checkout')}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default CartTable;