import {PaginationObject} from "@interfaces/common";
import {ProductCardObject} from "@interfaces/entities/product";

export type OrderCollectionObject = {
    orders: OrderObject[],
    pagination: PaginationObject,
}

export type QuickOrderObject = {
    id: number;
    status_label: string;
    status_value: string;
    total_formatted: string;
    comment: string|null;
    phone: string;
    email: string;
    created_at: string;
    product: ProductCardObject | null;
    product_name: string;
    product_image: string;
    product_variant: OrderItemProductVariantObject|null;
};

export type OrderObject = {
    id: number;
    public_token: string;
    status_label: string;
    status_value: string;
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
    items: OrderItemObject[];
}

export type OrderItemObject =
    | OrderItemProductObject
    | OrderItemBundleObject;

export type OrderItemProductObject = {
    entity_name: string;
    entity_type: 'product';
    entity_image: string | null;
    entity_price: string;
    entity_price_formatted: string;
    product_variant: OrderItemProductVariantObject|null;
    quantity: number;
    total: string;
    total_formatted: string;
};

export type OrderItemBundleObject = {
    entity_name: string;
    entity_type: 'bundle';
    entity_price: string;
    entity_price_formatted: string;
    quantity: number;
    total: string;
    total_formatted: string;
};

export type OrderItemProductVariantObject = {
    external_id: string;
    attributes: OrderItemProductVariantAttributesObject[];
};

export type OrderItemProductVariantAttributesObject = {
    attribute_name: string;
    attribute_value: string;
}

export type PaymentDataObject = {
    payment_method_id: number;
    payment_method_name: string;
};

export type ShippingBaseObject = {
    shipping_method_id: number;
    shipping_method_name: string;
}

export type ShippingLocalPickupObject = (
    ShippingBaseObject & {
        shipping_method_type: 'local_pickup';
        shop_address: string;
        shop_phone: string;
        shop_link: string;
    }
);

export type ShippingNovaPoshtaWarehouseObject = (
    ShippingBaseObject & {
        shipping_method_type: 'nova_poshta_warehouse';
        np_area: string | null;
        np_city: string | null;
        np_warehouse: string;
        np_warehouse_address: string;
        np_warehouse_type: string;
    }
);

export type ShippingNovaPoshtaCourierObject = (
    ShippingBaseObject & {
        shipping_method_type: 'nova_poshta_courier';
        np_street_ref: string;
        np_street_name: string;
        np_locality_ref: string;
        np_locality_name: string;
        np_house_number: string;
        np_apartment_number: string;
    }
);

export type ShippingDataObject =
    | ShippingLocalPickupObject
    | ShippingNovaPoshtaWarehouseObject
    | ShippingNovaPoshtaCourierObject;