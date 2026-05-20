import {PaginationObject} from "@interfaces/common";
import {ProductCardObject} from "@interfaces/entities/product";
import {TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";


export type SearchObject = {
    pagination: PaginationObject,
    products: ProductCardObject[],
    filters: TaxonomyFiltersObject,
};