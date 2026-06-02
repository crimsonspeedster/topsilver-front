import {WishlistObject} from "@interfaces/entities/wishlist";
import {cookies} from "next/headers";
import {emptyWishlistObject} from "@src/helpers";
import axiosClient from "@lib/axiosClient";

export const getWishlistSSR = async (): Promise<WishlistObject> => {
    const cookieStore = await cookies();

    try {
        const res = await axiosClient.get('/wishlist', {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return res.data.data;
    }
    catch (error) {
        return emptyWishlistObject;
    }
}