'use client';

import {getWishlist} from "@src/helpers";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import {useWishlistStore} from "@src/store/wishlist-store";


type Props = {
    id: number,
    parentClasses: string,
    childClasses?: string,
}

const WishListButton = (
    {
        id,
        parentClasses,
        childClasses,
    }: Props
) => {
    const isInWishlist = useWishlistStore(state => state.wishlist.includes(id));
    const toggleWishlist = useWishlistStore(state => state.toggleWishlist);

    return (
        <div
            className={parentClasses}
            onClick={
                ()=>toggleWishlist(id)
            }
        >
            <i
                className={childClasses + ` facl ${isInWishlist ? 'facl-heart' : 'facl-heart-o'}`}
            />
        </div>
    );
}

export default WishListButton;