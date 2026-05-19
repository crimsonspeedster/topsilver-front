"use client";

import PageBanner from "@src/commonsections/PageBanner";
import {useTranslations} from "next-intl";
import CartTable from "@src/components/Cart/CartTable";
import {CartObject} from "@interfaces/entities/cart";
import CouponSection from "@src/components/Coupon/CouponSection";
import {useCartStore} from "@src/store/cart-store";
import {useEffect, useMemo, useState} from "react";
import Link from "next/link";
import CertificateSection from "@src/components/Certificates/CertificateSection";
import BonusesSection from "@src/components/Bonuses/BonusesSection";
import {BonusesObject} from "@interfaces/entities/bonuses";


type Props = {
    initialCart: CartObject,
    bonuses: BonusesObject|null,
};

const CartPageSection = (
    {
        initialCart,
        bonuses,
    }: Props
) => {
    const tCart = useTranslations('Cart');
    const tCommon = useTranslations('Common');
    const cart = useCartStore((state) => state.cart);
    const hydrate = useCartStore((state) => state.hydrate);

    useEffect(() => {
        hydrate(initialCart);
    }, [initialCart]);

    return (
        <>
            <PageBanner
                title={tCart('cart')}
            />

            {
                cart.total_qty > 0 ?
                    <CartTable
                        subtotal={cart.subtotal_formatted}
                        items={cart.items}
                        total={cart.total_formatted}
                    />
                    :
                    <section className="py-5">
                        <div className="container">
                            <h1 className="text-center">{tCart('nothing_found')}</h1>

                            <div className="d-flex justify-content-center mt-4">
                                <Link
                                    className="btn btn-teal rounded-pill text-white px-4 fw-semibold btn btn-primary"
                                    href="/"
                                >{tCommon('return_to_home')}</Link>
                            </div>
                        </div>
                    </section>
            }

            {
                cart.total_qty > 0 &&
                <section className="py-5">
                    <div className="container cart__bottom">
                        <CouponSection />

                        <CertificateSection />

                        <BonusesSection
                            bonuses={bonuses}
                        />
                    </div>
                </section>
            }
        </>
    );
}

export default CartPageSection;