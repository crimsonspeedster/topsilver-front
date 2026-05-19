import {ProductPageEntityObject} from "@interfaces/entities/product";
import {TaxonomyPageEntityObject} from "@interfaces/entities/taxonomy";


export type PaginationObject = {
    total_items: number,
    total_pages: number,
    current_page: number,
    per_page: number,
    has_more_pages: boolean
}

export type MediaObject = {
    id: number,
    url: string,
}

export type VideoObject = {
    id: number,
    link: string,
    type: string,
    thumbnail: MediaObject,
}

export type SortObject = {
    slug: string,
    name: string,
}

export type PageEntityObject =
    | TaxonomyPageEntityObject
    | ProductPageEntityObject;