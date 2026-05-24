import {SelectOption} from "@interfaces/layouts/formField";
import {PaymentMethodObject} from "@interfaces/entities/payment-method";
import {ShippingMethodObject} from "@interfaces/entities/shipping-method";

export type CheckoutFormValues = {
    first_name: string,
    middle_name: string,
    last_name: string,
    phone: string,
    email: string,
    notes: string,

    payment_method: PaymentMethodObject | null,

    shipping_method: ShippingMethodObject | null,

    shop_id: string,

    np_area: string,
    np_city: SelectOption | null,
    np_warehouse: SelectOption | null,

    np_locality: SelectOption | null,
    np_street: SelectOption | null,
    np_house_number: string,
    np_apartment_number: string,

    rules: boolean,
};