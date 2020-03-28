const { Router } = require('express');
const router = Router();
const { AdminController, ProductController } = require('../apps/controllers/admin');
const { HomeController } = require('../apps/controllers/site')
const { auth } = require('../apps/middlewares');


router.group('/login', (loginRouter) => {
    // router.use(auth.authCheck);
    loginRouter.use(auth.authCheck)
        .route('/')
        .get(AdminController.getLogin)
        .post(AdminController.postLogin);
})

router.group("/admin", (adminRouter) => {

    adminRouter.use(auth.authGuest);
    adminRouter.get('/dashboard', AdminController.getDashboard);
    adminRouter.get('/logout', AdminController.getLogout);
    adminRouter.get('/products', ProductController.index);
    adminRouter.route('/products/create')
        .get(ProductController.create)
        .post(ProductController.store);
    adminRouter.route('/products/edit/:prd_id')
        .get(ProductController.edit)
        .post(ProductController.update);
    adminRouter.get('/products/show', ProductController.show);
    adminRouter.get('/products/delete/:prd_id', ProductController.delete);
})


router.group('/', (homeRouter) => {
    homeRouter.get('/', HomeController.index);
    homeRouter.get("/category/:cat_name-:cat_id", HomeController.category)
    homeRouter.get("/product/:prd_id", HomeController.product)
    homeRouter.post("/product/:prd_id/comment", HomeController.comment)
    homeRouter.post("/search", HomeController.search)
    homeRouter.get("/cart", HomeController.cart)
    homeRouter.get("/success", HomeController.success)
})

module.exports = router;