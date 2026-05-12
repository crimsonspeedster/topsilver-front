import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type RecentlyViewedStore = {
    ids: number[];
    addProduct: (id: number) => void;
    clear: () => void;
};

export const useRecentlyViewedStore =
    create<RecentlyViewedStore>()(
        persist(
            (set, get) => ({
                ids: [],

                addProduct: (id) => {
                    const ids = get().ids;

                    const filtered = ids.filter(
                        (item) => item !== id
                    );

                    set({
                        ids: [id, ...filtered].slice(0, 12),
                    });
                },

                clear: () =>
                    set({
                        ids: [],
                    }),
            }),
            {
                name: 'recently-viewed',
            }
        )
    );