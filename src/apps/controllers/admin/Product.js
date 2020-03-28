const mongoose = require('mongoose');

const ProductModel = mongoose.model('Product');

module.exports.index = async function(req, res) {
    const products = await ProductModel.find().populate('categories');
    console.log("LOGS: products", products);
    res.render("admin/product", { products })
}
module.exports.show = function(req, res) {
    res.send('Show')
}

module.exports.edit = function(req, res) {
    res.render("admin/edit_product")
}

module.exports.create = function(req, res) {
    res.render("admin/add_product")
}

module.exports.delete = function(req, res) {
    res.send('Delete')
}