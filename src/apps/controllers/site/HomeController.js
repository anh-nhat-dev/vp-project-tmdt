const mongoose = require('mongoose');

const ProductModel = mongoose.model('Product');
const CategoryModel = mongoose.model('Category');

module.exports.index = async function(req, res) {

    //  Get Featured Product
    const featuredProducts = await ProductModel.find({ prd_featured: 1 }).limit(6)

    //  Get Latest Product
    const latestProducts = await ProductModel.find().sort({ _id: -1 }).limit(6)
    res.render('site/index', { featuredProducts, latestProducts });
}

module.exports.category = async function(req, res) {

    const catId = req.params.cat_id
    const category = await CategoryModel.findById(catId)

    if (req.query.page) {
        var page = parseInt(req.query.page)
    } else {
        var page = 1
    }
    var rowsPerPage = 5
    var perRow = page * rowsPerPage - rowsPerPage

    var totalRows = await ProductModel.find({ cat_id: catId }).countDocuments()
    var totalPages = Math.ceil(totalRows / rowsPerPage)

    var pagePrev, pageNext
    if (page - 1 <= 0) {
        pagePrev = 1
    } else {
        pagePrev = page - 1
    }
    //
    if (page + 1 >= totalPages) {
        pageNext = totalPages
    } else {
        pageNext = page + 1
    }


    const products = await ProductModel
        .find({ cat_id: catId })
        .sort('-_id')
        .skip(perRow)
        .limit(rowsPerPage)

    res.render('site/category', { products, total: totalRows, category });
}

module.exports.product = async function(req, res) {
    const prdId = req.params.prd_id
    const product = await ProductModel.findById(prdId)
    res.render('site/product', { product });
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