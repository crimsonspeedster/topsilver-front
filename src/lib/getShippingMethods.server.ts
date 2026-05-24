import axiosClient from "@lib/axiosClient";
import {ShippingMethodObject} from "@interfaces/entities/shipping-method";

export const getShippingMethods = async (): Promise<ShippingMethodObject[]> => {
    try {
        const res = await axiosClient.get('reference/shipping-methods');

        return res.status === 200 ? res.data.data : [];
    }
    catch (error) {
        return [];
    }
}