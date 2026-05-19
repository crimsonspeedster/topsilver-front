import { create } from 'zustand';
import {CartObject} from "@interfaces/entities/cart";
import {emptyCartObject} from "@src/helpers";


type CartStore = {
    cart: CartObject;
    isHydrated: boolean;

    setCart: (cart: CartObject) => void;
    hydrate: (cart: CartObject) => void;

    reset: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
    cart: emptyCartObject,
    isHydrated: false,

    setCart: (cart) => set({ cart }),

    hydrate: (cart) =>
        set({
            cart,
            isHydrated: true,
        }),

    reset: () =>
        set({
            cart: emptyCartObject,
            isHydrated: false,
        }),
}));