import {SeoBlockObject} from "@interfaces/entities/seo";
import {MediaObject} from "@interfaces/common";


export type ContentEntityObject = {
    id: number;
    title: string;
    content: LayoutObject[];
    short_description: string | null;
    seo_block: SeoBlockObject | null;
    media: MediaObject | null;
}

export type PageObject = ContentEntityObject;

export type LayoutBaseObject = {
    key: string;
}

export type LayoutObject =
    | (LayoutBaseObject & {})

export type PagePageEntityObject = {
    type: 'page';
    entity: PageObject;
}