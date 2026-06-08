'use client';

import React, {useEffect} from 'react';
import {useCartStore} from "@src/store/cart-store";
import axiosClient from "@lib/axiosClient";


type Props = {
    children: React.ReactNode;
}

export default function CartProvider(
    {
        children,
    }: Props
) {
    const hydrateCart = useCartStore((state) => state.hydrate);

    useEffect(() => {
        axiosClient.get('/cart')
            .then((res) => {
                if (res.status === 200) {
                    hydrateCart(res.data.data);
                }
            });
    }, []);

    return children;
}