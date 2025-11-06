import express from "express";
const router = express.Router();

router.route("/").get(getCategories).post(protect, admin, createCategory);


export default router;