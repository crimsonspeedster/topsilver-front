import {TaxonomyCollectionPromiseObject} from "@interfaces/entities/taxonomy";
import axiosClient from "@lib/axiosClient";

export const getTaxonomiesSSR = async (page: number, type: string): Promise<TaxonomyCollectionPromiseObject|null> => {
    try {
        const res = await axiosClient.get(`taxonomies/${type}/collections`, {
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