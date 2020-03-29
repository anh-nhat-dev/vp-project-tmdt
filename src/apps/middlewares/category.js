const mongoose = require('mongoose');

module.exports = async function(req, res, next) {
    const CategoryModel = mongoose.model('Category')
    const categories = await CategoryModel.find();
    res.locals.categories = categories;
    next()
}