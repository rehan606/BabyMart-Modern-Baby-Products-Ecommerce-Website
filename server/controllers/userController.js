import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin


// Get all users
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

// Update User 
const updateUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id);

    if (!user){
        res.status(404);
        throw new Error("User not found");
    }

    // Allow updates by the user themesleves of admins

    if(user.id.toString() !== req.user._id.toString() && req.user.role !== 'admin'){
        res.status(401);
        throw new Error("Not authorized to update this user");
    }

    // Update user fields
    user.name = req.body.name || user.name;
  
    if (req.body.password) {
        user.password = req.body.password;
    }

    if (req.body.role) {
        user.role = req.body.role
    }
    user.addresses = req.body.addresses || user.addresses;

    // Image Setup 
    if (req.body.avatar && req.body.avatar !== user.avatar) {

        // Upload user to Cloudinary here if needed
        
    }

    const updatedUser = await user.save();
    res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        role: updatedUser.role,
        addresses: updatedUser.addresses,
    });
});

// Delete user 
const deleteUser= asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)

    if(user){
        // // Delete user's cart 
        // await Cart.deleteOne({ userId: user._id});

        // // Delete user's orders (if any exist)
        // await Order.deleteMany({ userId: user._id });

        // Delete User 
        await user.deleteOne();
        res.json({ message: "User removed"})
    } else {
        res.status(404);
        throw new Error("User not found");
    }
})

export { getUsers , createUser, deleteUser, updateUser };