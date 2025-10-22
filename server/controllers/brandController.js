import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import cloudinary from "../config/cloudinary.js";

// getBrands
const getBrands = asyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    res.json(brands);
})

// Create Brand
const createBrand = asyncHandler(async(req,res)=> {
    const {name, image} = req.body

    const brandExists = await Brand.findOne({ name });

    if(brandExists){
        res.status(400);
        throw new Error ("Brand already exists , try different Brand name")
    }

    let imageUrl = ""

    if(image){
        const result = await cloudinary.upload(image,{
            folder: "babymart/brands",
        });
        imageUrl = result.secure_url;
    }
    const brand = await Brand.create({
        name,
        image: imageUrl || "",
    });
    if (brand) {
        res.status(201).json(brand);
    } else {
        res.status(400);
        throw new Error("Invalid brand data");
    }
});

// GetBrandById
const getBrandById = asyncHandler(async (req, res) =>{
    const brand = await Brand.findById(req.params.id);

    if (brand) {
        res.json(brand);
    } else {
        res.status(404);
        throw new Error ("Brand not found");
    }
});

export { getBrands, createBrand, getBrandById };