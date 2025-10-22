import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        discountPercentage: {
            type: Number,
            default: 0, // discount is optional
            min: 0,
            max: 90,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        ratings: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
                
            },
        ],
        averageRating: {
            type: Number,
            default: 0, 
        },
    },
    {
        timestamps: true,
    }
);

// Calculate average rating before saving
productSchema.pre("save", function (next) {
    if (this.ratings && this.ratings.length > 0) {
        const sum = this.ratings.reduce((acc, item) => acc + item.rating, 0);
        this.averageRating = sum / this.ratings.length;
    }
    next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;