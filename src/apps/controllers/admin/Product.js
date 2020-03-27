module.exports.index = function(req, res) {
    res.send('List')
}
module.exports.show = function(req, res) {
    res.send('Show')
}

module.exports.edit = function(req, res) {
    res.send('Edit')
}

module.exports.create = function(req, res) {
    res.send('Create')
}

module.exports.delete = function(req, res) {
    res.send('Delete')
}