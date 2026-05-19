import {BundleObject, ProductCardObject, ProductVariantObject} from "@interfaces/entities/product";


export type CartObject = {
    items: CartItemObject[],
    subtotal: string;
    total: string;
    bonuses_used: number;
    total_formatted: string;
    subtotal_formatted: string;
    coupon: CouponType|null;
    certificates: CertificateObject[],
    items_count: number;
    total_qty: number;
};

export type CouponType = {
    code: string;
    type: string;
    value: string;
}

export type CertificateObject = {
    id: number;
    code: string;
    value: string;
};

export type CartItemObject =
    | CartItemProductObject
    | CartItemBundleObject

export type CartItemBase = {
    id: number;
    quantity: number;
    price: string;
    price_formatted: string;
    total: string;
    total_formatted: string;
    product_variant: ProductVariantObject | null;
}

export type CartItemProductObject = CartItemBase & {
    type: 'product';
    entity: ProductCardObject;
}

export type CartItemBundleObject = CartItemBase & {
    type: 'bundle';
    entity: BundleObject;
}