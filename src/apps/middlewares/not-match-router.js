module.exports = function(req, res, next) {
    try {

        const error = new Error('Page not found');
        error.code = 404;

        throw error;

    } catch (error) {
        next(error)
    }
}