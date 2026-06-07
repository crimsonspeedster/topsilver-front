'use client';

import { ProgressBar } from 'react-bootstrap';
import { useMemo } from 'react';
import {useCartStore} from "@src/store/cart-store";
import {useTranslations} from "next-intl";


type Props = {
    free_shipping: number | null;
};

const FreeShippingProgress = (
    {
        free_shipping
    }: Props
) => {
    const tCart = useTranslations('Cart');
    const cart = useCartStore((state) => state.cart);
    const currency = process.env.NEXT_PUBLIC_ENV_CURRENCY_SYMBOL_CODE ?? '$';

    const { remaining, percent, isFree } = useMemo(() => {
        const subtotal: number = parseFloat(cart.subtotal) ?? 0;

        if (!free_shipping) {
            return {
                remaining: 0,
                percent: 0,
                isFree: false,
            };
        }

        const remainingCalc = free_shipping - subtotal;
        const isFreeCalc = remainingCalc <= 0;

        const percentCalc = Math.min(
            100,
            Math.round((subtotal / free_shipping) * 100)
        );

        return {
            remaining: remainingCalc,
            percent: percentCalc,
            isFree: isFreeCalc,
        };
    }, [cart.subtotal, free_shipping]);

    if (!free_shipping) return null;

    return (
        <div className="p-3 border rounded bg-light">
            {isFree ? (
                <div className="text-success fw-semibold text-center">
                    🎉 {tCart('free_shipping_available')}
                </div>
            ) : (
                <>
                    <div className="mb-2 fw-semibold">
                        {tCart('free_shipping_from')} {free_shipping}{currency}
                    </div>

                    <div className="mb-2">
                        {
                            tCart.rich('add_more_products', {
                                strong: (chunks) => (
                                    <strong>
                                        {remaining}{currency}
                                    </strong>
                                )
                            })
                        }
                    </div>

                    <ProgressBar
                        now={percent}
                        label={`${percent}%`}
                    />
                </>
            )}
        </div>
    );
};

export default FreeShippingProgress;