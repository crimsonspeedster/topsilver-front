import {SearchObject} from "@interfaces/entities/search";
import axiosClient from "@lib/axiosClient";

type GetSearchDataParams = {
    page: number,
    category_id?: number|null,
    search: string,
    filters?: Record<number, number[]>,
    sort?: string,
    price?: {
        min?: number,
        max?: number,
    },
};

export const getSearchData = async (
    {
        page,
        category_id,
        search,
        filters,
        sort = process.env.NEXT_PUBLIC_ENV_FIRST_SORT_TYPE ?? "",
        price,
    }: GetSearchDataParams
): Promise<SearchObject | null> => {
    try {
        const res = await axiosClient.get('/', {
            params: {
                page,
                category_id,
                search,
                filters,
                sort,
                price,
            }
        });

        return res.status === 200 ? res.data.data : null;
    } catch (error) {
        return null;
    }
}