import axios from "axios";

export const api = axios.create({
    baseURL:
        // Use default value incase the env variable is not set
        process.env.NEXT_PUBLIC_API_URL || "https://frontend-test-api.digitalcreative.cn/",
});

api.interceptors.request.use(async (config) => {
    try {
        return config;
    } catch (error) {
        return Promise.reject(error);
    }
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);