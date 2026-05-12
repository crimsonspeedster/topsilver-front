import {MediaObject} from "@interfaces/common";

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
    title: string,
    excerpt: string|null,
    content: string|null,
}