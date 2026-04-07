'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import {UserObject} from "@helpers/interfaces";

export const userUser = () => {
    const [user, setUser] = useState<UserObject | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post(
            `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/user`,
            {},
            {
                withCredentials: true,
            }
        )
            .then(res => setUser(res.data.user))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return { user, loading };
};