module.exports.authCheck = (req, res, next) => {

    if (req.session.mail) {

        return res.redirect("/admin/dashboard")
    }
    next()
}

module.exports.authGuest = (req, res, next) => {

    if (!req.session.mail) {

        return res.redirect("/login")
    }
    next()
}