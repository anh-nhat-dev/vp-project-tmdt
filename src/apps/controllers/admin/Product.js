module.exports.index = function(req, res) {
    res.render("admin/product")
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