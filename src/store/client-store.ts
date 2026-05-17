import { create } from 'zustand';
import {UserObject} from "@interfaces/entities/user";


type AuthStore = {
    user: UserObject | null;
    hydrated: boolean;
    setUser: (user: UserObject | null) => void;
    clearUser: () => void;
};

export const useAuthStore = create<AuthStore>()(
    (set) => ({
        user: null,
        hydrated: false,
        setUser: (user) => {
            set({ user, hydrated: true });
        },
        clearUser: () => {
            set({ user: null, hydrated: true });
        },
    })
);