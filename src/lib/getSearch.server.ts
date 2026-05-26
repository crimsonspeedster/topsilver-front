import {ProductSearchPromiseObject} from "@interfaces/entities/product";
import {ParsedTaxonomySearchParams} from "@services/taxonomy/taxonomy.utils";
import axiosClient from "@lib/axiosClient";
import {AxiosResponse} from "axios";


export const getSearchDataSSR = async (
    props: ParsedTaxonomySearchParams
): Promise<ProductSearchPromiseObject | null> => {
    if (!props.search) {
        return null;
    }

    const paramsToSend: any = {
        sort: props.sort,
        search: props.search,
    }

    Object.entries(props.filters).forEach(
        ([attributeId, termIds]) => {
            paramsToSend[`filters[${attributeId}]`] = termIds.join(",");
        }
    );

    if (props.price?.min !== undefined) {
        paramsToSend['price[min]'] = String(props.price.min);
    }

    if (props.price?.max !== undefined) {
        paramsToSend['price[max]'] = String(props.price.max);
    }

    if (props.categories !== undefined) {
        paramsToSend['categories[]'] = String(props.categories.join(","));
    }

    if (props.collections !== undefined) {
        paramsToSend['collections[]'] = String(props.collections.join(","));
    }

    console.log(paramsToSend);

    try {
        const res: AxiosResponse<{data: ProductSearchPromiseObject}> = await axiosClient.get('/search', {
            params: paramsToSend,
        })

        return res.data.data;
    }
    catch (error) {
        return null;
    }
}