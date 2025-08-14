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
    login:async (credentials) => {},
    register: async (userData) => {
        try {
            await api 
        } catch (error) {
            console.error("Registration error:", error);
            throw error; 
        }
    },
    logout: () => {},
    checkIsAdmin: () => {},

}), {
    name: "auth-storage"
}
))