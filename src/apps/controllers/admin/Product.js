const mongoose = require('mongoose');
const config = require('config');

const ProductModel = mongoose.model('Product');
const CategoryModel = mongoose.model('Category');

var formidable = require("formidable")
var fs = require("fs")
var path = require("path")

module.exports.index = async function(req, res) {

    if (req.query.page) {
        var page = parseInt(req.query.page)
    } else {
        var page = 1
    }
    var rowsPerPage = 5
    var perRow = page * rowsPerPage - rowsPerPage

    var totalRows = await ProductModel.countDocuments()
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

    const products = await ProductModel.find().sort('-_id').skip(perRow).limit(rowsPerPage).populate('category');
    res.render("admin/product", { products })
}
module.exports.show = function(req, res) {
    res.send('Show')
}

module.exports.edit = async function(req, res) {
    //  GET Categories
    const categories = await CategoryModel.find()

    //  GET Product
    const prd_id = req.params.prd_id
    const product = await ProductModel.findById(prd_id)


    res.render("admin/edit_product", { categories, product });
}


module.exports.update = async function(req, res) {
    var prd_id = req.params.prd_id
    var form = new formidable.IncomingForm({
        uploadDir: path.join(config.get('app.root_path'), 'tmp')
    })
    form.parse(req, (err, fields, files) => {

        //   Upload File
        if (files.prd_image.name) {
            var oldPath = files.prd_image.path
            var newPath = files.prd_image.name
            newPath = path.join(config.get('app.static_folder'), 'images', 'products', newPath)
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err
            })
            fields.prd_image = files.prd_image.name
        }

        delete fields.sbm
            //  Edit product
        ProductModel.updateOne({ _id: prd_id }, fields).exec((err, docs) => {
            res.redirect("/admin/products")
        })
    })
}


module.exports.create = async function(req, res) {

    const categories = await CategoryModel.find();
    res.render("admin/add_product", { categories })
}

module.exports.store = function(req, res) {
    var form = new formidable.IncomingForm({
        uploadDir: path.join(config.get('app.root_path'), 'tmp')
    })
    form.parse(req, (err, fields, files) => {

        //   Upload File
        var oldPath = files.prd_image.path
        var newPath = files.prd_image.name
        newPath = path.join(config.get('app.static_folder'), 'images', 'products', newPath)
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err
        })

        //  Customize Obj files
        fields.prd_image = files.prd_image.name
        delete fields.sbm
            //  Add product
        var productInsert = new ProductModel(fields, { versionKey: false })
        productInsert.save()

        res.redirect("/admin/products")
    })
}

module.exports.delete = function(req, res) {
    const prd_id = req.params.prd_id
    ProductModel.deleteOne({ _id: prd_id }, (err, docs) => {
        res.redirect("/admin/products")
    })
}