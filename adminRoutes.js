const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {isUserAuthenticated} = require("../config/customFunctions");


router.all('/*', isUserAuthenticated, (req, res, next) => {

    req.app.locals.layout = 'admin';

    next();
});

/* RUTA POR DEFAULT DEL INDEX DEL ADMIN*/

router.route('/')
    .get(adminController.index);


/* VARIOS EDNPOINTS DE LOS POSTS DEL ADMIN */

router.route('/posts')
    .get(adminController.getPosts);


router.route('/posts/create')
    .get(adminController.getCreatePostPage)
    .post(adminController.submitCreatePostPage);


router.route('/posts/edit/:id')
    .get(adminController.getEditPostPage)
    .put(adminController.submitEditPostPage);


router.route('/posts/delete/:id')
    .delete(adminController.deletePost);


/* RUTAS DE LAS CATEGRIAS DEL ADMIN */

router.route('/category')
    .get(adminController.getCategories);


router.route('/category/create')
    .post(adminController.createCategories);


router.route('/category/edit/:id')
    .get(adminController.getEditCategoriesPage)
    .post(adminController.submitEditCategoriesPage);


/* RUTAS DE LOS COMENTARIOS DEL ADMIN */
router.route('/comment')
    .get(adminController.getComments)
    .post(adminController.approveComments);

module.exports = router;

