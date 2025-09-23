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
    password: z.string().min(6,{message:"Password must be at least 6 characters"}),
    role: z.enum(["admin", "user", "deliveryman"],{
        errorMap: () => ({message: "Please select a valid role",})
    }),
    avatar: z.string().optional(),
})