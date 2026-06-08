"use client";

import PageBanner from "@src/commonsections/PageBanner";
import {useTranslations} from "next-intl";
import CartTable from "@src/components/Cart/CartTable";
import CouponSection from "@src/components/Coupon/CouponSection";
import Link from "next/link";
import CertificateSection from "@src/components/Certificates/CertificateSection";
import BonusesSection from "@src/components/Bonuses/BonusesSection";
import {BonusesObject} from "@interfaces/entities/bonuses";
import React, {useEffect, useState} from "react";
import {ProductCardObject} from "@interfaces/entities/product";
import {useRecentlyViewedStore} from "@src/store/recently-viewed-store";
import axiosClient from "@lib/axiosClient";
import ViewedProductsSection from "@src/components/Product/Parts/ViewedProductsSection";
import {MediaObject} from "@interfaces/common";
import FreeShippingProgress from "@src/components/Cart/FreeShippingProgress";
import {useCartStore} from "@src/store/cart-store";


type Props = {
    bonuses: BonusesObject|null,
    banner?: MediaObject | null,
    free_shipping: number | null,
};

const CartPageSection = (
    {
        bonuses,
        banner,
        free_shipping,
    }: Props
) => {
    const tCart = useTranslations('Cart');
    const tCommon = useTranslations('Common');
    const cart = useCartStore(state => state.cart);

    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<ProductCardObject[]>([]);

    const ids = useRecentlyViewedStore(
        state => state.ids
    );
    const addProduct = useRecentlyViewedStore(
        state => state.addProduct
    );

    useEffect(() => {
        fetchRecentlyViewed();
    }, [ids]);

    const fetchRecentlyViewed = async () => {
        if (!ids.length) {
            setRecentlyViewedProducts([]);
            return;
        }

        try {
            const response = await axiosClient.get(
                '/products/batch',
                {
                    params: {
                        ids: ids.join(','),
                    },
                }
            );

            setRecentlyViewedProducts(response.data?.data ?? []);
        } catch (e) {

        }
    };

    return (
        <>
            <PageBanner
                title={tCart('cart')}
                media={banner}
            />

            {
                cart.total_qty > 0 ?
                    <>
                        <FreeShippingProgress
                            free_shipping={free_shipping}
                        />

                        <CartTable
                            subtotal={cart.subtotal_formatted}
                            items={cart.items}
                            total={cart.total_formatted}
                        />
                    </>
                    :
                    <section className="py-5">
                        <div className="container">
                            <h1 className="text-center">{tCart('nothing_found')}</h1>

                            <div className="d-flex justify-content-center mt-4">
                                <Link
                                    className="rounded-pill text-white px-4 fw-semibold btn btn-primary"
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

            <ViewedProductsSection
                title={tCommon('recently_viewed')}
                products={recentlyViewedProducts}
            />
        </>
    );
}

export default CartPageSection;