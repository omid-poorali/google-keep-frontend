import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from 'react-toastify';
import * as Utils from "utils";

declare module "axios" {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

export type APIRequest = {
    get: <A>(url: string) => Promise<A>;
    post: <A, B>(url: string, payload: A) => Promise<B>;
    put: <A, B>(url: string, payload: A) => Promise<B>;
    delete: <A, B>(url: string, payload: A) => Promise<B>;
}

const ConstantsList = Object.freeze({
    ACTION_UNAUTHORIZED: 'The user is unauthorized',
    ACTION_NOT_FOUND: 'Resource Not Found',
    ACTION_INTERNAL_SERVER: 'Internal Server Error',
    ACTION_REQUEST_TIMED_OUT: 'Request Timed Out',
});

function request(): APIRequest {

    // cached accessToken
    let accessToken: string | undefined;

    const service = axios.create({});
    service.defaults.baseURL = "http://localhost:8080/api";
    service.defaults.headers.common["Content-Type"] = "application/json";
    service.defaults.withCredentials = true;

    const handleSuccessResponse = (response: AxiosResponse) => {
        return response;
    }

    const handleErrorResponse = async (error: AxiosError) => {

        const originalRequest = error.config as AxiosRequestConfig<any>;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const { data } = await service.post("/auth/refresh-token");
            const newAccessToken = data?.data?.accessToken;
            if (newAccessToken) {
                accessToken = newAccessToken;
                Utils.setCookie("accessToken", newAccessToken);
                service.defaults.headers.common["Authorization"] = newAccessToken;
                if (originalRequest.headers) originalRequest.headers["Authorization"] = newAccessToken;
                return service(originalRequest);
            }
        }

        if (accessToken) {
            if (Utils.isTokenExpired(accessToken)) {
                Utils.removeCookie("accessToken");
            }
        }


        if (error && error.response) {
            switch (error.response.status) {
                case 401:
                    toast.error(ConstantsList.ACTION_UNAUTHORIZED, { className: "error-toast" });
                    break;
                case 404:
                    toast.error(ConstantsList.ACTION_NOT_FOUND, { className: "warn-toast" });
                    break;
                case 408:
                    toast.error(ConstantsList.ACTION_REQUEST_TIMED_OUT, { className: "warn-toast" });
                    break;
                case 500:
                    toast.error(ConstantsList.ACTION_INTERNAL_SERVER, { className: "warn-toast" });
                    break;
                case 400:
                    toast.error(error.message, { className: "error-toast" });
                    break;
                default:
                    toast.error(error.response.status + ": " + error.response.statusText, { className: "error-toast" });
                    break;
            }
        }

        return Promise.reject(error);
    }

    service.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
    service.interceptors.request.use((request: AxiosRequestConfig<any>) => {
        if (!accessToken) {
            accessToken = Utils.getCookie("accessToken");
        }
        if (accessToken && request.headers) request.headers["Authorization"] = accessToken;
        return request;
    });

    return {
        get: <T>(path: string) => {
            return new Promise<T>((resolve, reject) => {
                service.get(path).then(response => {
                    resolve(response.data.data as T);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        post: <A, B>(path: string, payload: A) => {
            return new Promise<B>((resolve, reject) => {
                service.post(path, payload).then(response => {
                    resolve(response.data.data as B);
                }).catch(error => {
                    reject(error);
                });
            })
        },
        put: <A, B>(path: string, payload: A) => {
            return new Promise<B>((resolve, reject) => {
                service.put(path, payload).then(response => {
                    resolve(response.data.data as B);
                }).catch(error => {
                    reject(error);
                });
            })
        },
        delete: <A, B>(path: string, payload: A) => {
            return new Promise<B>((resolve, reject) => {
                service.delete(path, { data: payload }).then(response => {
                    resolve(response.data.data as B);
                }).catch(error => {
                    reject(error);
                });
            })
        }
    }
}

export default request();