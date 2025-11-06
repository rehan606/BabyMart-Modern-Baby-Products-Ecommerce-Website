import {z} from "zod"

// Login Schema
export const loginSchema = z.object({
    email:z.string().email({message:"Please enter a valid email address"}),
    password:z.string().min(6,{message:"Password must be at least 6 characters"})
});


// Register Schema

export const registerSchema = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters"}),
    email: z.string().email({message:"Please enter a valid email address"}),
    password: z.string().min(6,{message:"Password must be at least 6 characters"}),
    role: z.enum(["admin", "user", "deliveryman"],{
        message: "Please select a valid role",
    })
});


// UserSchema

export const userSchema = z.object({
    name: z.string().min(2, {message: "Name must be at least 2 characters"}),
    email: z.string().email({message:"Please enter a valid email address"}),
    password: z.string().min(6, {message:"Password must be at least 6 characters"}).optional(),
    role: z.enum(["admin", "user", "deliveryman"],{
        message: "Please select a valid role",
    }),
    avatar: z.string().optional(), 
});

// BrandSchema  
export const brandSchema = z.object({
    name: z.string().min(2, {message: "Brand name must be at least 2 characters"}),
    image: z.string().optional(),
});

// CategorySchema
export const categorySchema = z.object({
    name: z.string().min(2, "Category name must be at least 2 characters"),
    image: z.string().optional(),
    categoryType: z.enum(["Featured", "Hot Categories", "Top Categories"] as const, {
        message: "Please select a valid category type",
    }),
    // createdAt: z.string().optional(),
});