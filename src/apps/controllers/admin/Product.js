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

module.exports.edit = function(req, res) {
    res.render("admin/edit_product")
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
    res.send('Delete')
}