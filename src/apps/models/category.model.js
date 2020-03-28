const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    cat_name: String
})

module.exports = mongoose.model("Category", CategorySchema, "Category")