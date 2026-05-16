import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENV_API_V1_LINK,
    withCredentials: true,
    withXSRFToken: true,
});

export default axiosClient;