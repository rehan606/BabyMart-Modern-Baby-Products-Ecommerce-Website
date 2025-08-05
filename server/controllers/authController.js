import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const loginUser = (req, res) => {
    res.send("Login Controller is working");
}; 


// Register a new user
// POST /api/auth/register
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, role} = req.body;
    
    const user = await User.create({
        name,
        email,
        password,
        role,
        addresses: [],
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            addresses: user.addresses,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

    res.send("Register Controller is working")
})



export { loginUser , registerUser};