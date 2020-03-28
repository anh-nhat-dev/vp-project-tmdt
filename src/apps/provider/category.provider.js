const mongoose = require('mongoose');

module.exports = async function(app) {
    const CategoryModel = mongoose.model('Category')
    const categories = await CategoryModel.find();
    app.locals.categories = categories;
}