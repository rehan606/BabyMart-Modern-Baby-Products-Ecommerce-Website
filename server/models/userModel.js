import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}; 

// Encrypt password using bcryptjs
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    } 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
// Ensure only one address can be default

const User = mongoose.model("User", userSchema);
export default User;
