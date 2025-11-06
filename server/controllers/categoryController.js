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

// Get Categories
const getCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 20;
  const sortOrder = req.query.sortOrder || "asc" ; // Default to ascending

  // Validation page and perPage
  if (page < 1 || perPage < 1) {
    res.status(400);
    throw new Error("Page and perPage must be positive integers");
  }

  // Validate sortOrder
  if (!["asc", "desc"].includes(sortOrder)) {
    res.status(400);
    throw new Error("sortOrder must be either 'asc' or 'desc'");
  }

  const skip = (page - 1) * perPage;
  const total = await Category.countDocuments({});
  const sortValue = sortOrder === "asc" ? 1 : -1;

  const categories = await Category.find({})
  .skip(skip)
  .limit(perPage)
  .sort({ createdAt: sortValue});

  const totalPages = Math.ceil(total / perPage);

  res.json({ categories, page, perPage, total, totalPages });
});

// Get Category by ID (Optional)
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export { createCategory, getCategories, getCategoryById };