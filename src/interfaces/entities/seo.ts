import {MediaObject} from "@interfaces/common";
import {LayoutObject} from "@interfaces/entities/page";

export type SeoPromiseObject = {
    seo: SeoObject | null,
    media: MediaObject | null,
}

export type SeoObject = {
    title: string,
    description: string|null,
    keywords: string|null,
    robots: {
        index: boolean,
        follow: boolean,
    },
}

export type SeoBlockObject = {
    content: LayoutObject[],
}