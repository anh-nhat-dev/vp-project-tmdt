const mongoose = require('mongoose');
const nodemailer = require('nodemailer')
const config = require('config');
const ejs = require('ejs');
const { join } = require('path');
const moment = require('moment')

const ProductModel = mongoose.model('Product');
const CategoryModel = mongoose.model('Category');
const CommentModel = mongoose.model('Comment')

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
    const product = await ProductModel.findById(prdId).populate({
        path: 'comments',
        options: {
            limit: 2
        }
    })
    res.render('site/product', { product });
}

module.exports.comment = async function(req, res) {
    const comment = new CommentModel({
        prd_id: req.params.prd_id,
        comm_name: req.body.comm_name,
        comm_mail: req.body.comm_mail,
        comm_details: req.body.comm_details
    })
    await comment.save()
    res.redirect("/product/" + req.params.prd_id)
}

module.exports.search = async function(req, res) {
    const keyWord = req.body.keyword
    const newKeyword = ".*" + keyWord.replace(" ", ".*") + ".*"

    let products = await ProductModel.find({ prd_name: { $regex: newKeyword, $options: 'i' } });

    res.render("site/search", { products: products, keyWord: keyWord })

}
module.exports.cart = async function(req, res) {

    const cart = req.session.cart;

    if (!cart || !cart.length) return res.render('site/cart', { products: [] })
    const productIds = cart.map(product => product.prd_id)
    const products = await ProductModel.find({ _id: { $in: productIds } })
    res.render('site/cart', { products });
}

module.exports.addToCart = function(req, res) {
    const body = req.body;
    const cart = req.session.cart;
    body.quantity = parseInt(body.quantity);
    if (!cart) {
        req.session.cart = [{ prd_id: body.prd_id, quantity: body.quantity }]
    }

    if (cart) {
        const isProductExists = cart.find(product => product.prd_id === body.prd_id);
        req.session.cart = isProductExists ?
            cart.map(product => product.prd_id === body.prd_id && (product.quantity += body.quantity) && product) :
            cart.push({ prd_id: body.prd_id, quantity: body.quantity }) && cart;

        // req.session.cart = isProductExists ?
        //     cart.map(product => product.prd_id === body.prd_id && (product.quantity += body.quantity) && product) : [...cart, { prd_id: body.prd_id, quantity: body.quantity }];

    }

    return res.redirect(`/product/${body.prd_id}`)
}

module.exports.updateCart = function(req, res) {
    const cart = req.body &&
        req.body.cart &&
        req.body.cart.map(item => (item.quantity = parseInt(item.quantity)) && item)
    req.session.cart = cart.filter((item) => item.quantity);
    return res.redirect('/cart')
}

module.exports.deleteCart = function(req, res) {
    const prd_id = req.params.prd_id;
    req.session.cart = req.session.cart.filter(item => item.prd_id !== prd_id);
    return res.redirect('/cart')
}

module.exports.success = function(req, res) {
    res.render('site/success');
}
module.exports.order = async function(req, res) {


    const body = req.body;
    const cart = req.session.cart;

    const transporter = nodemailer.createTransport(config.get("mail.transporter"))


    const productIds = cart.map(product => product.prd_id)
    const products = await ProductModel.find({ _id: { $in: productIds } });
    const total = cart.reduce((accumulator, item) => {
        const product = products.find(product => product.id === item.prd_id);
        return accumulator + (product.prd_price * item.quantity)
    }, 0)
    const htmlEmail = await ejs.renderFile(join(config.get("views.path"), 'site', 'email.ejs'), {
        cart,
        total,
        date: moment().format("MMM Do YY"),
        products,
        ...body,
    });

    await transporter.sendMail({
        to: body.mail,
        from: config.get("mail.options.from"),
        subject: "Thông báo đơn hàng",
        html: htmlEmail
    })

    req.session.cart = [];

    res.redirect(307, '/order/success')

}