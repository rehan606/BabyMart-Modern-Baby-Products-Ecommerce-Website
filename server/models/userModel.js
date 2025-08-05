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
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.gravatar.com/avatar/0000000000000000000000000000000?d=mp&f=y",
    },
    role: {
        type: String,
        enum: ["admin", "user", "deliveryman"],
        default: "user",
    },
    addresses: [
        {
            street: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
                required: true,
            },
            isDefault: {
                type: Boolean,
                default: false,
            }
        }
    ],
    wishlist: [],
    cart: [],


    
},{
    timestamps: true,
});


// Match user entered password to hashed password in database

// Encrypt password using bcryptjs

// Ensure only address is default

const User = mongoose.model("User", userSchema);
export default User;
