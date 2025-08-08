import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


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

// User Login
// POST /api/auth/login
const loginUser = asyncHandler (async(req, res) => {
    const {email, password} = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if(user && user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            addresses: user.addresses || [],
            token: generateToken(user._id), // gererateToken must be imported from utils
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

// Get user profile
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.body._id);

    // Check if user exists
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            addresses: user.addresses || [],
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

// Log out user
// POST /api/auth/logout
const logoutUser = asyncHandler(async(req, res) => {
    // Invalidate the token on the client side
    res.json({ success:true, message: "User logged out successfully" });
}); 


export { registerUser, loginUser , getUserProfile, logoutUser,  };