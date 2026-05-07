import {MediaObject} from "@interfaces/common";
import {SeoBlockObject, SeoObject} from "@interfaces/entities/seo";
import {VariantAttributeFunctionalityObject} from "@interfaces/entities/product";


export type TaxonomyObject = {
    id: number,
    title: string,
    description: string|null,
    media: MediaObject,
    seo: SeoObject,
    seo_block: SeoBlockObject|null,
}

export type TaxonomyFiltersObject = {
    attributes: VariantAttributeFunctionalityObject[],
    price: {
        min: number,
        max: number
    }
}