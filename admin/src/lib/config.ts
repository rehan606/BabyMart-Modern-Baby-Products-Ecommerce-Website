import axios, { AxiosInstance, AxiosResponse } from "axios"

// Configuration utility for Admin API
interface AdminApiConfig {
    baseURL: string;
    isProduction: boolean;
}

// Get API Configuration for admin
export const getAdminApiConfig=():AdminApiConfig=>{
    const apiUrl = import.meta.env.VITE_API_URL;

    if(!apiUrl){
        throw new Error("VITE_API_URL environment variable is not defined")
    }
    const isProduction = 
        import.meta.env.VITE_APP_ENV === "production" || 
        import.meta.env.PROD === true;

    return {
        baseURL: `${apiUrl}/api`,
        isProduction,
    };
}