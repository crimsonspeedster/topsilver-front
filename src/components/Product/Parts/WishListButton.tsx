'use client';

import {getWishlist} from "@src/helpers";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";


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
    const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

    useEffect(() => {
        const wishlist = getWishlist();

        setIsInWishlist(wishlist.includes(id));
    }, [id]);

    const wishListHandler = (id: number) => {
        const wishlist = getWishlist();

        const updatedWishlist = wishlist.includes(id)
            ? wishlist.filter(itemId => itemId !== id)
            : [...wishlist, id];

        Cookies.set('wishlist', JSON.stringify(updatedWishlist), {
            expires: 365,
            path: '/',
        });

        setIsInWishlist(updatedWishlist.includes(id));
    };

    return (
        <div
            className={parentClasses}
            onClick={
                ()=>wishListHandler(id)
            }
        >
            <i className={childClasses + ` facl ${isInWishlist ? 'facl-heart' : 'facl-heart-o'}`} />
        </div>
    );
}

export default WishListButton;