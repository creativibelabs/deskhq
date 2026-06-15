import axios from 'axios';
import { getAuthToken, clearAuthCookies } from './cookies';

const apiHandler = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept':        'application/json',
    },
    timeout: 30000,
});

// Request interceptor
apiHandler.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
apiHandler.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong';
        const status  = error.response?.status;

        if (status === 401) {
            clearAuthCookies();
            if (typeof window !== 'undefined') {
                window.location.href = '/dhq-admin/login';
            }
        }

        return Promise.reject({
            message,
            status,
            errors: error.response?.data?.errors || {},
        });
    }
);

export default apiHandler;