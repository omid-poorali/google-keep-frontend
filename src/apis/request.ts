import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
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

function request(): APIRequest {

    // cached accessToken
    let accessToken: string | undefined;

    const service = axios.create({});
    service.defaults.baseURL = "http://localhost:8080/api";
    service.defaults.headers.common["Content-Type"] = "application/json";
    service.defaults.withCredentials = true;

    const handleSuccessResponse = (response: AxiosResponse) => {
        return response.data;
    }

    const handleErrorResponse = async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig<any>;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const response = await service.post("/auth/refresh-token");
            const { accessToken } = response.data?.data;
            if (accessToken) {
                Utils.setCookie("accessToken", accessToken);
                service.defaults.headers.common["Authorization"] = accessToken;
                if (originalRequest.headers) originalRequest.headers["Authorization"] = accessToken;
                return service(originalRequest);
            }
            else {
                Promise.reject(error);
                // logout();
            };
        }
        return Promise.reject(error);
    }

    service.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
    service.interceptors.request.use((request: AxiosRequestConfig<any>) => {
        if (!accessToken) {
            accessToken = Utils.getCookie("accessToken");
        }
        if (request.headers) request.headers["Authorization"] = accessToken;
        return request;
    });

    return {
        get: <T>(path: string) => {
            return new Promise<T>((resolve, reject) => {
                service.get(path).then(response => {
                    resolve(response.data as T);
                }).catch(error => {
                    reject(error);
                });
            });
        },
        post: <A, B>(path: string, payload: A) => {
            return new Promise<B>((resolve, reject) => {
                service.post(path, payload).then(response => {
                    resolve(response.data as B);
                }).catch(error => {
                    reject(error);
                });
            })
        },
        put: <A, B>(path: string, payload: A) => {
            return new Promise<B>((resolve, reject) => {
                service.put(path, payload).then(response => {
                    resolve(response.data as B);
                }).catch(error => {
                    reject(error);
                });
            })
        },
        delete: <A, B>(path: string, payload: A) => {
            return new Promise<B>((resolve, reject) => {
                service.delete(path, { data: payload }).then(response => {
                    resolve(response.data as B);
                }).catch(error => {
                    reject(error);
                });
            })
        }
    }
}

export default request();