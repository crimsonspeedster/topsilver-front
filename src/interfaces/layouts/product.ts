import {ProductObject} from "@interfaces/entities/product";

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
    | 'sku'
>  & {
    size_guide: string|null,
    delivery_and_return: string|null,
};