import { api } from '@/lib/api';
import { create } from 'zustand';
import { persist } from "zustand/middleware"; // persist for local storage

type User = {
    _id:string;
    name:string;
    email:string;
    avatar:string;
    role:"admin" | "user" | "deliveryman"
}

type AuthState = {
    user: User | null;
    token:string | null;
    isAuthenticated:boolean;
    login:(Credentials:{email:string; password:string})=> Promise<void>;
    register: (userData: {
        name: string;
        email: string;
        password: string;
        role: string;
    }) => Promise<void>;

    logout: () => void;
    checkIsAdmin:()=>boolean
};

const useAuthStore = create<AuthState>() (persist((set, get)=>({
    user: null,
    token: null,
    isAuthenticated: false,

    // Login
    login:async (credentials) => {
        try {
            const response = await api.post("/auth/login", credentials);
            console.log("response", response)

            if (response.data.token ) {
                set({
                    user: response.data,
                    token: response.data.token,
                    isAuthenticated: true,
                });
            }
        } catch (error) {
            console.error("Login error:", error);
            throw error; 
        }
    },

    //Register
    register: async (userData) => {
        try {
            await api.post("/auth/register", userData);
        } catch (error) {
            console.error("Registration error:", error);
            throw error; 
        }
    },

    // Logout
    logout: () => {
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },

    // Check Admin
    checkIsAdmin: () => {
        const { user } = get();
        return user?.role === "admin";
    },

}), {
    name: "auth-storage"
}
));
export default useAuthStore ;

