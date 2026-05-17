import {PaginationObject} from "@interfaces/common";

export type OrderCollectionObject = {
    orders: OrderObject[],
    pagination: PaginationObject,
}

export type OrderObject = {
    id: number;
    status: string;
    total_formatted: string;
    subtotal_formatted: string;
    paid_at: string|null;
    notes: string|null;
    first_name: string;
    last_name: string;
    middle_name: string|null;
    phone: string;
    email: string;
    discount_amount: string;
    coupon_code: string|null;
    payment_type: string;
    payment_data: PaymentDataObject;
    shipping_type: string;
    shipping_data: ShippingDataObject;
    created_at: string;
}

export type PaymentDataObject = {

};

export type ShippingDataObject = {

};