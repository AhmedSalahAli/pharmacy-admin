import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log('➡️ Request:', config.method?.toUpperCase(), config.url);

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
