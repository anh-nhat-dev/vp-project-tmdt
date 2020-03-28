const { Router } = require('express');
const router = Router();
const { AdminController, ProductController } = require('../apps/controllers/admin')

router.get('/admin/dashboard', AdminController.getDashboard);
router.route('/admin/login')
    .get(AdminController.getLogin)
    .post(AdminController.postLogin);
router.get('/admin/logout', AdminController.getLogout);

router.get('/admin/products', ProductController.index);
router.route('/admin/products/create')
    .get(ProductController.create)
    .post(ProductController.store);
router.route('/admin/products/edit/:prd_id')
    .get(ProductController.edit)
    .post(ProductController.update);
router.get('/admin/products/show', ProductController.show);
router.get('/admin/products/delete/:prd_id', ProductController.delete);

module.exports = router;