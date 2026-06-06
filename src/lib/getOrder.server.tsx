import axiosClient from "@lib/axiosClient";
import {OrderObject} from "@interfaces/entities/orders";


export const getOrder = async (token: string): Promise<OrderObject | null> => {
    try {
        const res = await axiosClient.get(`checkout/success/${token}`);

        return res.data.data;
    }
    catch (error) {
        return null;
    }
}