import axios from 'axios';

export function handleApiError(error: unknown): string[] {
    if (!axios.isAxiosError(error)) {
        console.error('Unexpected Error:', error);
        return ['Unexpected error occurred.'];
    }

    console.error('Axios Error:', error.message);

    if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
    }

    const data = error.response?.data;

    if (!data) {
        return ['Unable to reach the server. Please try again.'];
    }

    if (typeof data === 'string') {
        return [data];
    }

    if (Array.isArray(data.message)) {
        return data.message;
    }

    if (typeof data.message === 'string') {
        return [data.message];
    }

    if (typeof data.error === 'string') {
        return [data.error];
    }

    return ['Something went wrong.'];
}
