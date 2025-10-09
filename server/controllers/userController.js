import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password'); // Exclude password field
    res.json(users);
});

// Create a user 
const createUser = asyncHandler(async(req, res) => {
    const { name, email, password, role, addresses } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name, 
        email, 
        password, 
        role, 
        addresses: addresses || [],
    });

    if(user){
        // Initialize empty cart
       res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        addresses: user.addresses,
       });
    } else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});

export { getUsers ,createUser }