import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { API_CONFIG } from "../utils/constants";

class ApiService {
    private api: AxiosInstance;

    constructor() {
        this.api = axios.create({
            baseURL: API_CONFIG.BASE_URL,
            timeout: API_CONFIG.TIMEOUT,
            headers: { "Content-Type": "application/json" },
        });
    }

    async get<T>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
        const res = await this.api.get<T>(url, { ...config, params });
        return res.data;
    }

    async post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const res = await this.api.post<T>(url, data, config);
        return res.data;
    }
}

export const api = new ApiService();