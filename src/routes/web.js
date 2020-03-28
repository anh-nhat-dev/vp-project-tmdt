const { Router } = require('express');
const router = Router();
const { AdminController, ProductController } = require('../apps/controllers/admin')

router.get('/admin/dashboard', AdminController.getDashboard);
router.route('/admin/login')
    .get(AdminController.getLogin)
    .post(AdminController.postLogin);
router.get('/admin/logout', AdminController.getLogout);

router.get('/admin/products', ProductController.index);
router.get('/admin/products/create', ProductController.create);
router.get('/admin/products/edit', ProductController.edit);
router.get('/admin/products/show', ProductController.show);
router.get('/admin/products/delete', ProductController.delete);

module.exports = router;