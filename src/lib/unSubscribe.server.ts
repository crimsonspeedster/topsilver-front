import axiosClient from "@lib/axiosClient";


export const unSubscribe = async (token: string): Promise<null> => {
    try {
        await axiosClient.get(`unsubscribe/${token}`);
    }
    catch (error) {

    }

    return null;
}