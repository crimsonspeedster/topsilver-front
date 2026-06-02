'use client';

import React, {useEffect, useRef} from 'react';
import {WishlistObject} from "@interfaces/entities/wishlist";
import axiosClient from "@lib/axiosClient";
import {useWishlistStore} from "@src/store/wishlist-store";


type Props = {
    initialWishlist?: WishlistObject;
    children?: React.ReactNode;
}

export default function WishlistProvider(
    {
        children,
        initialWishlist,
    }: Props
) {
    const hydrateWishlist = useWishlistStore(state => state.hydrate);
    const hasHydrated = useRef(false);

    useEffect(() => {
        if (hasHydrated.current)
            return;

        hasHydrated.current = true;

        if (initialWishlist !== undefined) {
            hydrateWishlist(initialWishlist);
            return;
        }

        axiosClient.get('/wishlist')
            .then(res => {
                if (res.status === 200) {
                    hydrateWishlist(res.data.data);
                }
            });
    }, []);

    return children;
}