import axiosClient from "@lib/axiosClient";
import {SettingsPromiseObject} from "@interfaces/entities/settings";


export const getSettingsSSR = async (): Promise<SettingsPromiseObject[]> => {
    try {
        const res = await axiosClient.get('settings');

        return res.data.data;
    }
    catch (error) {
        return [];
    }
}