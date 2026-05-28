import {MenuObject} from "@interfaces/entities/menu";
import axiosClient from "@lib/axiosClient";


export const getMenusSSR = async (): Promise<MenuObject[]> => {
    try {
        const res = await axiosClient.get('/menus');

        return res.data.data;
    }
    catch (error) {
        return [];
    }
}

export const getMenuSSR = async (location_name: string): Promise<MenuObject | null> => {
    try {
        const res = await axiosClient.get(`/menus/${location_name}`);

        return res.data.data;
    }
    catch (error) {
        return null;
    }
}