import { handleApiError } from './error-handler';

export function onResponse(response: any) {
    console.log(
        '✅',
        response.status,
        response.config.url,
    );

    return response;
}

export function onResponseError(error: unknown) {
    handleApiError(error);

    return Promise.reject(error);
}
