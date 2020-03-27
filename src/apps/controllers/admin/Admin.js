module.exports.getLogin = function(req, res) {
    let mail = req.body.mail
    let pass = req.body.pass

    if (mail == "vietpro.edu.vn@gmail.com" && pass == "123456") {
        res.redirect("/admin/dashboard")
    } else {
        let error = "Tài khoản không hợp lệ !"
        res.render("admin/login", { data: { error: error } });
    }
}

module.exports.getLogout = function(req, res) {
    res.send('Logout')
}

module.exports.getDashboard = function(req, res) {
    res.render("admin/dashboard");
}