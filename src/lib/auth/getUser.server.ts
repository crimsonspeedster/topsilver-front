import { cookies } from 'next/headers';
import axios from 'axios';
import {UserObject} from "@helpers/interfaces";

export const getUserSSR = async (): Promise<UserObject | null> => {
    try {
        const cookieStore = await cookies();
        const access_token = cookieStore.get('access_token');

        if (!access_token) {
            return null;
        }

        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/user`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token.value}`
                }
            }
        );

        return res.status === 200 ? res.data.user : null;
    } catch (err) {
        return null;
    }
};