import {MediaObject} from "@interfaces/common";
import {SeoBlockObject, SeoObject} from "@interfaces/entities/seo";
import {VariantAttributeFunctionalityObject} from "@interfaces/entities/product";


export type TaxonomyObject = {
    id: number,
    title: string,
    description: string|null,
    media: MediaObject|null,
    seo_block: SeoBlockObject|null,
}

export type TaxonomyCollectionObject = {
    id: number,
    title: string,
    slug: string,
}

export type TaxonomyFiltersObject = {
    attributes: VariantAttributeFunctionalityObject[],
    price: PriceObject,
}

export type PriceObject = {
    min: number,
    max: number
}