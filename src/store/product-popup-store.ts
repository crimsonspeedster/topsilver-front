import { create } from 'zustand';
import {ProductQuickShopObject, ProductQuickViewObject} from "@interfaces/entities/product";


type ProductPopupStore = {
    quickView: boolean;
    quickShop: boolean;
    selectedProductQuickShop: ProductQuickShopObject | null;
    selectedProductQuickView: ProductQuickViewObject | null;
    openQuickView: (
        product: ProductQuickViewObject
    ) => void;
    openQuickShop: (
        product: ProductQuickShopObject
    ) => void;
    closeQuickView: () => void;
    closeQuickShop: () => void;
};

export const useProductPopupStore = create<ProductPopupStore>((set) => ({
    quickView: false,
    quickShop: false,
    selectedProductQuickShop: null,
    selectedProductQuickView: null,


    openQuickView: (product) =>
        set({
            quickView: true,
            selectedProductQuickView: product,
        }),

    openQuickShop: (product) =>
        set({
            quickShop: true,
            selectedProductQuickShop: product,
        }),

    closeQuickView: () =>
        set({
            quickView: false,
            selectedProductQuickView: null,
        }),

    closeQuickShop: () =>
        set({
            quickShop: false,
            selectedProductQuickShop: null,
        }),
}));