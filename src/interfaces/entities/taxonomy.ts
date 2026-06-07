import {MediaObject, PaginationObject} from "@interfaces/common";
import {ProductCardObject, VariantAttributeFunctionalityObject} from "@interfaces/entities/product";
import {LayoutObject} from "@interfaces/entities/page";
import {SeoBlockObject} from "@interfaces/entities/seo";


export type TaxonomyObject = {
    id: number,
    title: string,
    description: string|null,
    content: LayoutObject[],
    media: MediaObject|null,
    banner: MediaObject|null,
    seo_block: SeoBlockObject | null;
}

export type TaxonomyCollectionObject = {
    id: number,
    title: string,
    description: string|null,
    slug: string,
    media: MediaObject|null,
}

export type TaxonomyCollectionPromiseObject = {
    taxonomies: TaxonomyCollectionObject[];
    pagination: PaginationObject;
}

export type TaxonomyOptionsObject = Omit<TaxonomyCollectionObject, 'slug'>;

export type TaxonomyFiltersObject = {
    attributes: VariantAttributeFunctionalityObject[],
    price: PriceObject,
}

export type PriceObject = {
    min: number,
    max: number
}

export type TaxonomyPageEntityObject = {
    type: 'category' | 'collection' | 'promotion',
    entity: TaxonomyObject,
    pagination: PaginationObject,
    products: ProductCardObject[],
    filters: TaxonomyFiltersObject,
}

export type FilterPageEntityObject = {
    type: 'filter_page',
    entity: TaxonomyObject,
    pagination: PaginationObject,
    products: ProductCardObject[],
    filters: TaxonomyFiltersObject,
    category: TaxonomyCollectionObject,
}