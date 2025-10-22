import mongoose from "mongoose"

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            required: false, // image is optional
        },
        categoryType: {
            type: String,
            required: false, // categoryType is optional
            enum: ["Featured", "Hot Categories", "Top Categories", "New Arrivals"],
        },
    },
    {
        timestamps: true,
    }
    
);

const Category = mongoose.model("Category", categorySchema);

export default Category;