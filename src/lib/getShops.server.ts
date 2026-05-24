import {SeoPromiseObject} from "@interfaces/entities/seo";
import axiosClient from "@lib/axiosClient";
import {ShopsObject, ShopsPromiseObject} from "@interfaces/entities/shops";


export const getShopsSSR = async (page: number): Promise<ShopsPromiseObject | null> => {
    try {
        const res = await axiosClient.get('shops', {
            params: {
                page,
            }
        });

        return res.status === 200 ? res.data.data : null;
    }
    catch (error) {
        return null;
    }
}

export const getShopSingleSSR = async (slug: string): Promise<ShopsObject | null> => {
    try {
        const res = await axiosClient.get(`shops/${slug}`);

        return res.status === 200 ? res.data.data : null;
    }
    catch (error) {
        return null;
    }
}

export const getShopsSeo = async (slug: string): Promise<SeoPromiseObject | null> => {
    try {
        const res = await axiosClient.get(`shops/${slug}/seo`);

        return res.status === 200 ? res.data.data : null;
    }
    catch (error) {
        return null;
    }
}