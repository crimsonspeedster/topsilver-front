import {ProductCardObject} from "@interfaces/entities/product";
import {LayoutBaseObject} from "@interfaces/entities/page";


export type ProductGridWithTabsObject = {
    title: string;
    description: string|null;
    blocks: ProductsGridWithTabsItemLayoutObject[];
}

export type ProductsGridWithTabsItemObject = {
    tab_name: string;
    tab_slug: string;
    products: ProductCardObject[];
}

export type ProductsGridWithTabsItemLayoutObject =
    | (LayoutBaseObject & {
        layout: 'ProductsGridWithTabsItem';
        attributes: ProductsGridWithTabsItemObject;
    });

export type ProductGridWithTabsLayoutObject = {
    layout: 'ProductsGridWithTabs';
    attributes: ProductGridWithTabsObject;
}