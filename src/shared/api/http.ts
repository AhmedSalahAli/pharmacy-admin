import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import {
    onRequest,
} from './request.interceptor';
import {
    onResponse,
    onResponseError,
} from './response.interceptor';

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(onRequest);

api.interceptors.response.use(
    onResponse,
    onResponseError,
);
