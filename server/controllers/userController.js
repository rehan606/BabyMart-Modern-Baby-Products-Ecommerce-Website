import asyncHandler from "express-async-handler"

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password') // Exclude password field
    res.json(users)
}
  
)

export { getUsers }