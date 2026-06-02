import { create } from 'zustand';
import {WishlistObject} from "@interfaces/entities/wishlist";
import {emptyWishlistObject} from "@src/helpers";


type WishlistStore = {
    wishlist: WishlistObject;
    isHydrated: boolean;

    setWishlist: (wishlist: WishlistObject) => void;
    hydrate: (wishlist: WishlistObject) => void;

    reset: () => void;
};

export const useWishlistStore = create<WishlistStore>((set) => ({
    wishlist: emptyWishlistObject,
    isHydrated: false,

    setWishlist: (wishlist) => set({ wishlist }),

    hydrate: (wishlist) =>
        set({
            wishlist,
            isHydrated: true,
        }),

    reset: () =>
        set({
            wishlist: emptyWishlistObject,
            isHydrated: false,
        }),
}));