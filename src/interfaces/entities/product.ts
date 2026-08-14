import {MediaObject, PaginationObject, VideoObject} from "@interfaces/common";
import {LabelsObject} from "@interfaces/entities/label";
import {attributeObject, attributeTermFunctionalityObject, attributeTermObject} from "@interfaces/entities/attribute";
import {TaxonomyCollectionObject, TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";
import {ReviewObject} from "@interfaces/entities/reviews";


export type VariantAttributeObject = {
    attribute: attributeObject,
    terms: attributeTermObject[],
}

export type VariantAttributeFunctionalityObject = {
    attribute: attributeObject,
    terms: attributeTermFunctionalityObject[],
}

export type BreadcrumbsObject = {
    title: string,
    slug: string|null,
}

export type BundleObject = {
    id: number;
    title: string;
    old_price: string;
    price: string;
    price_formatted: string;
    old_price_formatted: string;
    items: BundleItemObject[];
};

export type BundleItemObject = {
    id: number;
    quantity: number;
    product: ProductCardObject;
};

export type ProductVariantObject = {
    id: number,
    variant_key: string,
    price: string,
    price_on_sale: string|null,
    price_formatted: string,
    price_on_sale_formatted: string|null,
    discount_percent: number|null,
    stock: number|null,
    stock_status: string,
    attribute_terms?: attributeTermObject[],
}

export type ProductObject = {
    id: number,
    title: string,
    description: string|null,
    short_description: string|null,
    media: MediaObject|null,
    gallery?: MediaObject[],
    videos?: VideoObject[],
    price: string,
    price_on_sale: string|null,
    price_formatted: string,
    price_on_sale_formatted: string|null,
    discount_percent: number|null,
    manage_stock: boolean,
    stock: number,
    stock_status: string,
    sku: string,
    rating_avg: string,
    rating_count: number,
    rating_distribution: number[],
    type: 'variable' | 'companion' | 'simple',
    labels: LabelsObject[],
    variant_attributes: VariantAttributeObject[],
    variants: ProductVariantObject[],
    categories: TaxonomyCollectionObject[],
    collections: TaxonomyCollectionObject[],
    promotions: TaxonomyCollectionObject[],
    group_products: ProductCardObject[],
    cross_sells: ProductCardObject[],
    bundles: BundleObject[],
}

export type ProductCardObject = Pick<
    ProductObject,
    | 'id'
    | 'title'
    | 'price'
    | 'price_on_sale'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'labels'
    | 'type'
    | 'media'
    | 'stock_status'
    | 'stock'
    | 'manage_stock'
    | 'discount_percent'
    | 'variants'
    | 'variant_attributes'
> & {
    slug: string,
}

export type ProductQuickShopObject = Pick<
    ProductObject,
    | 'id'
    | 'title'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'media'
    | 'stock_status'
    | 'stock'
    | 'type'
    | 'manage_stock'
    | 'variant_attributes'
    | 'variants'
    | 'discount_percent'
> & {
    slug: string,
}

export type ProductQuickViewObject = Pick<
    ProductObject,
    | 'id'
    | 'title'
    | 'short_description'
    | 'media'
    | 'gallery'
    | 'stock_status'
    | 'stock'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'type'
    | 'manage_stock'
    | 'variant_attributes'
    | 'variants'
    | 'discount_percent'
    | 'categories'
    | 'collections'
    | 'promotions'
    | 'sku'
    | 'labels'
    | 'rating_avg'
    | 'rating_count'
> & {
    slug: string,
}

export type ProductPageEntityObject = {
    type: 'product',
    entity: ProductObject,
    prev_next: {
        prev: ProductCardObject | null,
        next: ProductCardObject | null,
    },
    breadcrumbs: BreadcrumbsObject[],
    reviews: ReviewObject[],
}

export type TaxonomiesCollectionObject = {
    id: number;
    title: string;
    selected: boolean;
}

export type ProductSearchPromiseObject = {
    products: ProductCardObject[];
    pagination: PaginationObject;
    filters: TaxonomyFiltersObject;
    query: string;
    categories: TaxonomiesCollectionObject[];
    collections: TaxonomiesCollectionObject[];
}