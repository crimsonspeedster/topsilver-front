import {SeoObject, SeoPromiseObject} from "@interfaces/entities/seo";

type GetPageParams = {
    slug: string,
    page: number,
    filters?: Record<number, number[]>,
    sort?: string,
    price?: {
        min?: number,
        max?: number,
    },
};

export const getPage = async (
    {
        slug,
        page,
        filters = {},
        sort = process.env.NEXT_PUBLIC_ENV_FIRST_SORT_TYPE ?? "",
        price,
    }: GetPageParams
) => {
    const url = new URL(
        `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/slug-resolver/${slug}`
    );

    url.searchParams.set(
        "page",
        page.toString(),
    );

    url.searchParams.set(
        "sort",
        sort,
    );

    Object.entries(filters).forEach(
        ([attributeId, termIds]) => {
            url.searchParams.set(
                `filters[${attributeId}]`,
                termIds.join(","),
            );
        }
    );

    if (price?.min !== undefined) {
        url.searchParams.set(
            "price[min]",
            String(price.min),
        );
    }

    if (price?.max !== undefined) {
        url.searchParams.set(
            "price[max]",
            String(price.max),
        );
    }

    const res = await fetch(url.toString(), {
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    const json = await res.json();
    return json?.data ?? null;
};

export const getPageSeo = async (slug: string): Promise<SeoPromiseObject | null> => {
    const baseUrl = process.env.NEXT_PUBLIC_ENV_API_V1_LINK;

    const url = `${baseUrl}/slug-resolver/${slug}/seo`;

    const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();

    return json?.data ?? null;
};