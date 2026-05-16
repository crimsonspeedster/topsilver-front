import { cookies } from 'next/headers';
import axios from 'axios';
import {UserObject} from "@interfaces/entities/user";
import axiosClient from "@lib/axiosClient";

export const getUserSSR = async (): Promise<UserObject | null> => {
    const cookieStore = await cookies();

    try {
        const res = await axiosClient.get('/me', {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return res.status === 200 ? res.data.data : null;
    } catch (err) {
        console.error(err);
        return null;
    }
};