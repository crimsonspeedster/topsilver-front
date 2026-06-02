'use client';

import {useWishlistStore} from "@src/store/wishlist-store";
import axiosClient from "@lib/axiosClient";
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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const isInWishlist = useWishlistStore(state => state.wishlist.items.some(item => item.product.id === id));
    const setWishlist = useWishlistStore((state) => state.setWishlist);

    const handleClick = async () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        if (isInWishlist) {
            try {
                const res = await axiosClient.delete(`wishlist/items/${id}`);

                setWishlist(res.data.data);
            }
            catch (error) {

            }
            finally {
                setIsLoading(false);
            }
        }
        else {
            const formData = new FormData();
            formData.append("product_id", id.toString());

            try {
                const res = await axiosClient.post('wishlist/items', formData);

                setWishlist(res.data.data);
            }
            catch (error) {

            }
            finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div
            className={parentClasses}
            onClick={handleClick}
        >
            <i
                className={childClasses + ` facl ${isInWishlist ? 'facl-heart' : 'facl-heart-o'}`}
            />
        </div>
    );
}

export default WishListButton;