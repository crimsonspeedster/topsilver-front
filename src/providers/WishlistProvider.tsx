'use client';

import React, {useEffect} from 'react';
import axiosClient from "@lib/axiosClient";
import {useWishlistStore} from "@src/store/wishlist-store";


type Props = {
    children: React.ReactNode;
}

export default function WishlistProvider(
    {
        children,
    }: Props
) {
    const hydrateWishlist = useWishlistStore(state => state.hydrate);

    useEffect(() => {
        axiosClient.get('/wishlist')
            .then(res => {
                if (res.status === 200) {
                    hydrateWishlist(res.data.data);
                }
            });
    }, []);

    return children;
}