import express from "express";
import {createUser, getUsers,  } from "../controllers/userController.js";
import {admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').get( protect, admin, getUsers).post(protect, admin, createUser)

export default router;