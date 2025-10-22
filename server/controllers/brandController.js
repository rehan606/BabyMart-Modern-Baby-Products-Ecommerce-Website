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

export { getBrands, createBrand };