import { cookies } from 'next/headers';
import {UserObject} from "@interfaces/entities/user";
import axiosClient from "@lib/axiosClient";
import {OrderCollectionObject} from "@interfaces/entities/orders";
import {BonusesObject} from "@interfaces/entities/bonuses";


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
        return null;
    }
};

export const getUserBonusesSSR = async (): Promise<BonusesObject | null> => {
    const cookieStore = await cookies();

    try {
        const res = await axiosClient.get('/me/bonuses', {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });

        return res.status === 200 ? res.data.data : null;
    } catch (err) {
        return null;
    }
};

export const getUserOrdersSSR = async (
    {
        page
    }
    :
    {
        page: number
    }
): Promise<OrderCollectionObject | null> => {
    const cookieStore = await cookies();

    try {
        const res = await axiosClient.get('/me/orders', {
            headers: {
                Cookie: cookieStore.toString(),
            },
            params: {
                page,
            }
        });

        return res.status === 200 ? res.data.data : null;
    } catch (err) {
        return null;
    }
};