
const ENV = import.meta.env.MODE; // "development" | "staging" | "production"
const APP_NAME = import.meta.env.VITE_APP_NAME || "Default App";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MOCK_API_ENV = import.meta.env.VITE_MOCK_API === "true";


export const APP_CONFIG = {
    NAME: APP_NAME,
    BASE_URL,
    ENV,
    MOCK_API: MOCK_API_ENV
};

export const API_CONFIG = {
    BASE_URL: APP_CONFIG.BASE_URL + '/api',
    TIMEOUT: 60000,
    MOCK_API: false, // APP_CONFIG.MOCK_API,
    USE_REFRESH_TOKEN: false, // Set false untuk langsung logout saat 401
};