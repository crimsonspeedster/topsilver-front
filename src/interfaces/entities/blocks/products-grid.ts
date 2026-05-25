import {ProductCardObject} from "@interfaces/entities/product";


export type ProductsGridObject = {
    title: string;
    description: string|null;
    products: ProductCardObject[];
}

export type ProductsGridLayoutObject = {
    layout: 'ProductsGrid';
    attributes: ProductsGridObject;
}