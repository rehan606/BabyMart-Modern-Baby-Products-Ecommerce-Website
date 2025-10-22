import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { createBrand } from "../controllers/brandController.js";

const router = express.Router();

// Home Route
router.route("/").get(getBrands).post(protect,admin,createBrand, )

// :id

export default router;