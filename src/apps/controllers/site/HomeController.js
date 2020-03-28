const mongoose = require('mongoose');

const ProductModel = mongoose.model('Product');

module.exports.index = async function(req, res) {

    //  Get Featured Product
    const featuredProducts = await ProductModel.find({ prd_featured: 1 }).limit(6)

    //  Get Latest Product
    const latestProducts = await ProductModel.find().sort({ _id: -1 }).limit(6)
    res.render('site/index', { featuredProducts, latestProducts });
}

module.exports.category = function(req, res) {
    res.render('site/category');
}

module.exports.product = function(req, res) {
    res.render('site/product');
}

module.exports.search = function(req, res) {
    res.render('site/search');
}
module.exports.cart = function(req, res) {
    res.render('site/cart');
}
module.exports.success = function(req, res) {
    res.render('site/success');
}