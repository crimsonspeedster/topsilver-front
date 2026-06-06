import {PaymentMethodObject} from "@interfaces/entities/payment-method";
import axiosClient from "@lib/axiosClient";

export const getPaymentMethods = async (): Promise<PaymentMethodObject[]> => {
    try {
        const res = await axiosClient.get('/reference/payment-methods');

        return res.status === 200 ? res.data.data : [];
    }
    catch (error) {
        return [];
    }
}