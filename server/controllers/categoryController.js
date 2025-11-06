import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import cloudinary from "../config/cloudinary.js";



// Create a new category
const createCategory = asyncHandler(async (req, res) => {
  const { name, image, categoryType } = req.body;
  
  // Validate required fields
  if (!name || typeof name !== "string") {
    res.status(400);
    throw new Error("Category name is required and must be a string");
  }

  // Validate categoryType
  const validCategoryTypes = ["Featured", "Hot Categories", "Top Categories"];
  if (!validCategoryTypes.includes(categoryType)) {
    res.status(400);
    throw new Error("Please select a valid category type");
  }

  // Check if category already exists
  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  // Upload image to Cloudinary

  let imageUrl = "";
  if (image) {
    const result = await cloudinary.uploader.upload(image, {
      folder: "babymart/categories",
    });
    imageUrl = result.secure_url;
  }

    // Create new category
    const category = await Category.create({
      name,
      image: imageUrl || undefined,
      categoryType,
    });
    if (category) {
      res.status(201).json(category);
    } else {
      res.status(400);
      throw new Error("Invalid category data");
    }
});

export { getCategories, createCategory };