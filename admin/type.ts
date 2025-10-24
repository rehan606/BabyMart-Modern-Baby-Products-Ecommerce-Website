
interface UserType {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    role: "admin" | "user" | "deliveryman";
    createdAt: string;
};

interface Brand {
    _id: string;
    name: string;
    image?: string; // image is optional
    createdAt: string;
}

export type { UserType, Brand };
