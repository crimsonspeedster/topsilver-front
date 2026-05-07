import {MediaObject} from "@interfaces/common";
import {LabelsObject} from "@interfaces/entities/label";
import {attributeObject, attributeTermFunctionalityObject, attributeTermObject} from "@interfaces/entities/attribute";


export type VariantAttributeObject = {
    attribute: attributeObject,
    terms: attributeTermObject[],
}

export type VariantAttributeFunctionalityObject = {
    attribute: attributeObject,
    terms: attributeTermFunctionalityObject[],
}

export type ProductVariantObject = {
    id: number,
    variant_key: string,
    price: string,
    price_on_sale: string|null,
    price_formatted: string,
    price_on_sale_formatted: string|null,
    stock: number|null,
    stock_status: string,
}

export type Product = {
    id: number,
    title: string,
    description: string|null,
    short_description: string|null,
    media: MediaObject,
    gallery: MediaObject[],
    price: string,
    price_on_sale: string|null,
    price_formatted: string,
    price_on_sale_formatted: string|null,
    manage_stock: boolean,
    stock: number|null,
    stock_status: string,
    sku: string,
    rating_avg: number,
    rating_count: number,
    type: string,
    labels: LabelsObject[],
    variant_attributes: VariantAttributeObject[],
    variants: ProductVariantObject[],
}

export type ProductCardObject = Pick<
    Product,
    | 'id'
    | 'title'
    | 'price'
    | 'price_on_sale'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'labels'
    | 'media'
    | 'stock_status'
    | 'stock'
    | 'manage_stock'
> & {
    slug: string|null,
}

export type ProductQuickShopObject = Pick<
    Product,
    | 'id'
    | 'title'
    | 'price'
    | 'price_on_sale'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'media'
    | 'stock_status'
    | 'stock'
    | 'manage_stock'
    | 'variant_attributes'
    | 'variants'
> & {
    slug: string|null,
}
