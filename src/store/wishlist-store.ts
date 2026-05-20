import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type WishlistStore = {
    wishlist: number[];
    toggleWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            wishlist: [],

            toggleWishlist: (id: number) => {
                const wishlist = get().wishlist;

                set({
                    wishlist: wishlist.includes(id)
                        ? wishlist.filter(itemId => itemId !== id)
                        : [...wishlist, id],
                });
            },

            isInWishlist: (id: number) => {
                return get().wishlist.includes(id);
            },
        }),
        {
            name: 'wishlist',
        }
    ),
);