import {ProductObject} from "@interfaces/entities/product";
import {Dispatch, SetStateAction} from "react";

export type ProductTopProps = Pick<
    ProductObject,
    | 'id'
    | 'title'
    | 'gallery'
    | 'videos'
    | 'media'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'discount_percent'
    | 'short_description'
    | 'variant_attributes'
    | 'variants'
    | 'type'
    | 'collections'
    | 'categories'
    | 'manage_stock'
    | 'stock'
    | 'stock_status'
    | 'sku'
>  & {
    size_guide: string|null,
    delivery_and_return: string|null,
};

export type ProductTopInfoProps = Pick<
    ProductObject,
    | 'id'
    | 'title'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'discount_percent'
    | 'short_description'
    | 'variant_attributes'
    | 'variants'
    | 'type'
    | 'collections'
    | 'sku'
    | 'categories'
    | 'manage_stock'
    | 'stock_status'
    | 'stock'
> & {
    size_guide: string|null,
    delivery_and_return: string|null,
};

export type ProductPurchaseProps = Pick<
    ProductObject,
    | 'id'
    | 'manage_stock'
    | 'stock'
    | 'variant_attributes'
    | 'variants'
    | 'stock_status'
    | 'type'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'discount_percent'
> & {
    priceHandle: (price: string, price_on_sale: string|null, discount_percent: number|null) => void;
}