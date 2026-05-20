import {SeoPromiseObject} from "@interfaces/entities/seo";
import {PageEntityObject} from "@interfaces/common";
import axiosClient from "@lib/axiosClient";


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
): Promise<PageEntityObject|null> => {
    const paramsToSend: any = {
        page,
        sort,
    };

    Object.entries(filters).forEach(
        ([attributeId, termIds]) => {
            paramsToSend[`filters[${attributeId}]`] = termIds.join(",");
        }
    );

    if (price?.min !== undefined) {
        paramsToSend['price[min]'] = String(price.min);
    }

    if (price?.max !== undefined) {
        paramsToSend['price[max]'] = String(price.max);
    }

    try {
        const res = await axiosClient.get(`/slug-resolver/${slug}`, {
            params: paramsToSend,
        });

        return res.status === 200 ? res.data.data : null;
    }
    catch (error) {
        return null;
    }
};

export const getPageSeo = async (slug: string): Promise<SeoPromiseObject | null> => {
    try {
        const res = await axiosClient.get(`slug-resolver/${slug}/seo`);

        return res.status === 200 ? res.data.data : null;
    }
    catch (error) {
        return null;
    }
};