import type { AxiosRequestConfig } from "axios";
import type { ClinicQueryParams } from "../type/clinic.types";
import { api } from "./api";

class ClinicService {
    async getClinics(
        params?: ClinicQueryParams,
        config?: AxiosRequestConfig
    ): Promise<any> {
        const client = api;
        return await client.get<any>("/clinics", params, config);
    }

    async getCategories(
        config?: AxiosRequestConfig
    ): Promise<any> {
        const client = api;
        return await client.get<any>("/categories", config);
    }

    async getClinicById(
        id: string,
        config?: AxiosRequestConfig
    ): Promise<any> {
        const client = api;
        return await client.get<any>(`/clinics/${id}`, config);
    }

    async getBookings(
        params?: ClinicQueryParams,
        config?: AxiosRequestConfig
    ): Promise<any> {
        const client = api;
        return await client.get<any>("/bookings", params, config);
    }

    async createBooking(
        data: any,
        config?: AxiosRequestConfig
    ): Promise<any> {
        const client = api;
        return await client.post<any>("/bookings", data, config);
    }
}


export const clinicService = new ClinicService();
