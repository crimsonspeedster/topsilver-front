import {CityObject, RegionObject} from "@interfaces/entities/city";
import axiosClient from "@lib/axiosClient";


export const getCitiesSSR = async (): Promise<CityObject[]> => {
    try {
        const res = await axiosClient.get('/reference/cities');

        return res.status === 200 ? res.data.data : [];
    } catch (err) {
        return [];
    }
};
