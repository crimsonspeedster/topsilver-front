'use client';

import React, {useEffect, useRef} from 'react';
import {CartObject} from "@interfaces/entities/cart";
import {useCartStore} from "@src/store/cart-store";
import axiosClient from "@lib/axiosClient";


type Props = {
    initialCart?: CartObject;
    children: React.ReactNode;
}

export default function CartProvider(
    {
        initialCart,
        children,
    }: Props
) {
    const hydrateCart = useCartStore((state) => state.hydrate);
    const hasHydrated = useRef(false);

    useEffect(() => {
        if (hasHydrated.current)
            return;

        hasHydrated.current = true;

        if (initialCart !== undefined) {
            hydrateCart(initialCart);
            return;
        }

        axiosClient.get('/cart')
            .then((res) => {
                if (res.status === 200) {
                    hydrateCart(res.data.data);
                }
            });
    }, []);

    return children;
}