export const buildTaxonomyProductsUrl = (
    type: string,
    id: number,
) => {
    return `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/taxonomies/${type}/products/${id}`;
};

export const buildTaxonomyPageUrl = (
    slug: string,
    page: number,
    params?: URLSearchParams,
) => {
    const pathname = page === 1
        ? `/${slug}`
        : `/${slug}/page/${page}`;

    const query = params?.toString();

    return query
        ? `${pathname}?${query}`
        : pathname;
};

export type ParsedTaxonomySearchParams = {
    sort: string,
    filters: Record<number, number[]>,
    price: {
        min?: number,
        max?: number,
    },
    categories: number[],
    collections: number[],
    search: string|null,
};

export const parseTaxonomySearchParams = (
    searchParams: Record<string, string | string[] | undefined | null>,
): ParsedTaxonomySearchParams => {
    const filters: Record<number, number[]> = {};

    let sort: string = process.env.NEXT_PUBLIC_ENV_FIRST_SORT_TYPE ?? "";
    let search: string | null = null;
    let categories: number[] = [];
    let collections: number[] = [];
    let priceMin: number | undefined;
    let priceMax: number | undefined;

    Object.entries(searchParams).forEach(([key, value]) => {
        if (!value || Array.isArray(value)) {
            return;
        }

        if (key === "sort") {
            sort = value;
            return;
        }

        if (key === "search") {
            search = value;
            return;
        }

        if (key === 'categories[]') {
            categories = value
                .split(',')
                .map(Number)
                .filter(Boolean);

            return;
        }

        if (key === 'collections[]') {
            collections = value
                .split(',')
                .map(Number)
                .filter(Boolean);

            return;
        }

        if (key === "price[min]") {
            const parsed = Number(value);

            if (!Number.isNaN(parsed)) {
                priceMin = parsed;
            }

            return;
        }

        if (key === "price[max]") {
            const parsed = Number(value);

            if (!Number.isNaN(parsed)) {
                priceMax = parsed;
            }

            return;
        }

        const match = key.match(/^filters\[(\d+)]$/);

        if (!match) {
            return;
        }

        const attributeId = Number(match[1]);
        filters[attributeId] = value
            .split(",")
            .map(Number)
            .filter(Boolean);
    });

    return {
        sort,
        filters,
        categories,
        collections,
        search,
        price: {
            min: priceMin,
            max: priceMax,
        },
    };
};