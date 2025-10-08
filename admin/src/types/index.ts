export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'admin' | 'user' | 'deliveryman';
    avatar?: string;
    createdAt: string;  
}