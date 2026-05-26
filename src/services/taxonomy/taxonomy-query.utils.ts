import {TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";
import {ReadonlyURLSearchParams} from "next/navigation";
import {SortObject} from "@interfaces/common";
import {TaxonomiesCollectionObject} from "@interfaces/entities/product";


export const buildTaxonomyQueryParams = (
    filters: TaxonomyFiltersObject,
    sorting: SortObject,
    searchParams: ReadonlyURLSearchParams,
    price?: {
        min?: number,
        max?: number,
    },
    // search?: string,
    categories?: TaxonomiesCollectionObject[],
    collections?: TaxonomiesCollectionObject[],
) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categories) {
        params.delete('categories[]');

        categories
            .filter(taxonomy => taxonomy.selected)
            .forEach(taxonomy => {
                params.append('categories[]', taxonomy.id.toString());
            });
    }

    if (collections) {
        params.delete('collections[]');

        collections
            .filter(taxonomy => taxonomy.selected)
            .forEach(taxonomy => {
                params.append('collections[]', taxonomy.id.toString());
            });
    }

    filters.attributes.forEach(item => {
        const selectedTerms = item.terms
            .filter(term => term.selected)
            .map(term => term.id);

        const key = `filters[${item.attribute.id}]`;

        if (selectedTerms.length) {
            params.set(key, selectedTerms.join(","));
        } else {
            params.delete(key);
        }
    });

    if (price?.min !== undefined) {
        params.set(
            "price[min]",
            String(price.min),
        );
    } else {
        params.delete("price[min]");
    }

    if (price?.max !== undefined) {
        params.set(
            "price[max]",
            String(price.max),
        );
    } else {
        params.delete("price[max]");
    }

    params.set('sort', sorting.slug);
    params.delete("page");

    return params;
};
