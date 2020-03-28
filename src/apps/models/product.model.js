const mongoose = require("mongoose");
require('./category.model')

const ProductSchema = new mongoose.Schema({
    cat_id: mongoose.Types.ObjectId,
    prd_name: String,
    prd_image: String,
    prd_price: Number,
    prd_warranty: String,
    prd_accessories: String,
    prd_new: String,
    prd_promotion: String,
    prd_status: Boolean,
    prd_featured: Number,
    prd_details: String
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

ProductSchema.virtual("categories", {
    ref: "Category",
    localField: "cat_id",
    foreignField: "_id",
    justOne: true
})


module.exports = mongoose.model("Product", ProductSchema, 'Product');