import axios, { AxiosResponse, Method } from 'axios';

const apiEndpoint = 'https://admin-api-staging.indochat.net';

const axiosInstance = axios.create({
    baseURL: apiEndpoint,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface RequestParams {
    [key: string]: any;
}

export default function apiRequest(
    url: string,
    method: Method,
    params?: RequestParams,
    data?: any,
    headers?: Record<string, string>
): Promise<AxiosResponse | undefined> {
    return axiosInstance
        .request({
            url,
            method,
            params,
            data,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.getItem('ms_api_token')}`,
                ...headers,
            },
        })
        .then((response) => response)
        .catch((error) => error.response);
}
