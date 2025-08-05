import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: "https://www.gravatar.com/avatar/0000000000000000000000000000000?d=mp&f=y",
    }
    
})

