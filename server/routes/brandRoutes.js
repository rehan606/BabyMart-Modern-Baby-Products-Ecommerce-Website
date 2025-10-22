import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import { createBrand, getBrands } from "../controllers/brandController.js";

const router = express.Router();

// Home Route
router.route("/").get(getBrands).post(protect, admin, createBrand );

// :id
router
    .route("/:id")
    .get(getBrandById)
    .put(protect, admin, updateBrand)
    .delete(protect, admin, deleteBrand);

export default router;