import asyncHandler from "express-async-handler";

const loginUser = (req, res) => {
    res.send("Login Controller is working");
}; 

const registerUser = (req, res) => {
    res.send("Register Controller is working");
}

export { loginUser , registerUser};