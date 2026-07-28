import type { InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../../store/useAuthStore';

export function onRequest(config: InternalAxiosRequestConfig) {
    const token = useAuthStore.getState().accessToken;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
        '➡️',
        config.method?.toUpperCase(),
        config.url,
    );

    return config;
}
