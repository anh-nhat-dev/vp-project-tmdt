const mongoose = require('mongoose');

const UserModel = mongoose.model('User');

module.exports.getLogin = function(req, res) {
    res.render("admin/login", { data: {} });
}

module.exports.postLogin = function(req, res) {
    let mail = req.body.mail
    let pass = req.body.pass

    UserModel.findOne({ user_mail: mail, user_pass: pass }).then(doc => {
        if (doc) {
            return res.redirect("/admin/dashboard")
        }
        const error = "Tài khoản không hợp lệ !";
        res.render("admin/login", { data: { error: error } });

    }).catch(e => {
        const error = "Lỗi không xác định";
        res.render("admin/login", { data: { error: error } });
    })
}

module.exports.getLogout = function(req, res) {
    res.send('Logout')
}

module.exports.getDashboard = function(req, res) {
    res.render("admin/dashboard");
}