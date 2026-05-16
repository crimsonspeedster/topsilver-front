import axios from 'axios';
import {CityObject, RegionObject} from "@interfaces/entities/city";

export const getCitiesSSR = async (): Promise<CityObject[]> => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/reference/cities`,
        );

        return res.status === 200 ? res.data.data : [];
    } catch (err) {
        return [];
    }
};

export const getRegionsSSR = async (): Promise<RegionObject[]> => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/reference/regions`,
        );

        return res.status === 200 ? res.data.data : [];
    } catch (err) {
        return [];
    }
};