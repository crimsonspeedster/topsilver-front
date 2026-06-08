'use client';

import React, {useEffect} from 'react';
import {useAuthStore} from "@src/store/client-store";
import axiosClient from "@lib/axiosClient";


type Props = {
    children: React.ReactNode;
};

export default function AuthProvider(
    {
        children,
    }: Props
) {
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        axiosClient.get('/me')
            .then((res) => {
                if (res.status === 200) {
                    setUser(res.data.data);
                }
            });
    }, []);

    return children;
}