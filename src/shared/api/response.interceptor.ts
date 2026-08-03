import axios, {
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';

import { useAuthStore } from '../../store/useAuthStore';
import { handleApiError } from './error-handler';
import { api } from './http';
import { refreshAccessToken } from './token-refresh';

export function onResponse(response: AxiosResponse) {
    console.log(
        '✅',
        response.status,
        response.config.url,
    );

    return response;
}

export async function onResponseError(error: unknown) {
    handleApiError(error);

    if (!axios.isAxiosError(error)) {
        return Promise.reject(error);
    }

    const originalRequest =
        error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
        };

    // Don't retry refresh requests
    if (originalRequest.url?.includes('/auth/refresh')) {
        useAuthStore.getState().logout();

        return Promise.reject(error);
    }

    // Not an auth error or already retried
    if (
        error.response?.status !== 401 ||
        originalRequest._retry
    ) {
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
        const accessToken = await refreshAccessToken();

        originalRequest.headers.Authorization =
            `Bearer ${accessToken}`;

        return api(originalRequest);
    } catch (e) {
        useAuthStore.getState().logout();

        return Promise.reject(e);
    }
}
