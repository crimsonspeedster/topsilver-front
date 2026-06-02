import {ProductCardObject} from "@interfaces/entities/product";

export type WishlistObject = {
    items: WishlistItemObject[],
    items_count: number;
}

export type WishlistItemObject = {
    id: number;
    product: ProductCardObject,
}