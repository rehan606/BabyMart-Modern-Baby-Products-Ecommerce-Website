import express from "express"
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

// Auth routes
router.get("/login", loginUser);



export default router;
 