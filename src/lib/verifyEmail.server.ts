import axiosClient from "@lib/axiosClient";

export const verifyEmail = async (id: string, hash: string): Promise<{success: boolean, message: string}> => {
    try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("hash", hash);

        const res = await axiosClient.post('/email/verify', formData);

        return {
            success: true,
            message: res.data.message
        };
    }
    catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? 'Unknown error',
        };
    }
};