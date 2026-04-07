import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENV_API_LINK,
    withCredentials: true,
});

export default axiosClient;