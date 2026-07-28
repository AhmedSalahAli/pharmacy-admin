import axios from 'axios';

export function handleApiError(error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);

        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        }

        return;
    }

    console.error('Unexpected Error:', error);
}
