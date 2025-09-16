import adminApi from "@/lib/config"
import useAuthStore from "@/store/useAuthStore"
import { useEffect } from "react"

export const useAxiosPrivet = () => {
    const {logout } = useAuthStore()

    useEffect(() => {
        // Add your axios private instance logic here
        // For example, you can set up interceptors for requests and responses
        // to handle authentication and token refresh   

        const responseIntercept = adminApi.interceptors.response.use((response) => response,(error) => {
            if (error?.response?.status === 401){
                logout();

                // redirect to login page
                window.location.href = '/login';
            }
            return Promise.reject(error);
        });
        return () => {
            adminApi.interceptors.response.eject(responseIntercept);
        };

    },[logout]);
    return adminApi;
}