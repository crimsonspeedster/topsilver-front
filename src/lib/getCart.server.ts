import {CartObject} from "@interfaces/entities/cart";
import {cookies} from "next/headers";
import axiosClient from "@lib/axiosClient";
import {emptyCartObject} from "@src/helpers";


export const getCartSSR = async (): Promise<CartObject> => {
    const cookieStore = await cookies();

    try {
        const res = await axiosClient.get('/cart', {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return res.status === 200 ? res.data.data : emptyCartObject;
    } catch (error) {
        return emptyCartObject;
    }
}