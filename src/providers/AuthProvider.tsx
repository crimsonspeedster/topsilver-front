'use client';

import React, { useEffect } from 'react';
import {UserObject} from "@interfaces/entities/user";
import {useAuthStore} from "@src/store/client-store";


type Props = {
    user: UserObject | null;
    children: React.ReactNode;
};

export default function AuthProvider({ user, children }: Props) {
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        setUser(user);
    }, []);

    return children;
}