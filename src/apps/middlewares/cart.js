module.exports = function(req, res, next) {
    if (req.session.cart) {

        res.locals.cart = req.session.cart;
    } else {
        res.locals.cart = []
    }

    next();

}