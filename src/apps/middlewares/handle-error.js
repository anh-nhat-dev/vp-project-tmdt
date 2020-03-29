module.exports = function(error, req, res, next) {
    if (!error.code) {
        error.code = 500;
    }
    return res.render('site/error', { code: error.code, message: error.message });
}