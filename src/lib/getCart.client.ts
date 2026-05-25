import {CartObject} from "@interfaces/entities/cart";
import axiosClient from "@lib/axiosClient";
import {emptyCartObject} from "@src/helpers";


export const getCartClient = async (): Promise<CartObject> => {
    try {
        const res = await axiosClient.get('/cart');

        return res.status === 200 ? res.data.data : emptyCartObject;
    } catch (error) {
        return emptyCartObject;
    }
}