const mongoose = require('mongoose');

const UserModel = mongoose.model('User');

module.exports.getLogin = function(req, res, next) {
    try {
        res.render("admin/login", { data: {} });
    } catch (error) {
        next(error)
    }
}

module.exports.postLogin = function(req, res, next) {
    try {
        let mail = req.body.mail
        let pass = req.body.pass

        UserModel.findOne({ user_mail: mail, user_pass: pass }).then(doc => {
            if (doc) {
                req.session.mail = req.body.mail
                return res.redirect("/admin/dashboard")
            }
            const error = "Tài khoản không hợp lệ !";
            res.render("admin/login", { data: { error: error } });

        }).catch(e => {
            const error = "Lỗi không xác định";
            res.render("admin/login", { data: { error: error } });
        })
    } catch (error) {
        next(error)
    }
}

module.exports.getLogout = function(req, res, next) {
    try {
        req.session.destroy()
        res.redirect("/login")
    } catch (error) {
        next(error)
    }
}

module.exports.getDashboard = function(req, res, next) {
    try {
        res.render("admin/dashboard");
    } catch (error) {
        next(error)
    }
}