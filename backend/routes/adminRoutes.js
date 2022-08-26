const express = require('express');
const router = express.Router();
const {isAdmin} = require('../config/auth');
const { 
  showLoginForm,
  adminLoginAction,
  showDashboard,
  adminLogoutAction,
  blogList,
  addNewPost,
  addNewPostAction,
  editPost,
  editPostAction,
  deletePost,
  productCategories,
  addNewProductCategory,
  editProductCategory,
  editProductCategoryAction,
  deleteProductCategoryAction,
  allProducts,
  addNewProduct,
  addNewProductAction,
  editProduct,
  editProductAction,
  deleteProductAction,
  getAllContacts,
  getAllOrders
} = require('../controllers/adminController');


router.get('/login', showLoginForm);
router.post('/login', adminLoginAction);
router.get('/dashboard', isAdmin, showDashboard);
router.get('/logout', adminLogoutAction);


// blog routes
router.get('/bloglist', isAdmin, blogList);
router.get('/new-post', isAdmin, addNewPost);
router.post('/new-post', addNewPostAction);
router.get('/edit-post/:id', editPost);
router.post('/edit-post/:id', editPostAction);
router.delete('/delete-post/:id', deletePost);


// Product Categories routes
router.get('/product-categories', isAdmin, productCategories);
router.post('/add-product-category', isAdmin, addNewProductCategory);
router.get('/edit-product-category/:catid', isAdmin, editProductCategory);
router.post('/edit-product-category/:catid', isAdmin, editProductCategoryAction);
router.delete('/delete-product-category/:catid', isAdmin, deleteProductCategoryAction);

// Product routes
router.get('/products', isAdmin, allProducts);
router.get('/add-product', isAdmin, addNewProduct);
router.post('/add-product', isAdmin, addNewProductAction);
router.get('/edit-product/:productid', isAdmin, editProduct);
router.post('/edit-product/:productid', isAdmin, editProductAction);
router.delete('/delete-product/:productid', isAdmin, deleteProductAction);

router.get('/all-contacts', isAdmin, getAllContacts);

router.get('/all-orders', isAdmin, getAllOrders);



module.exports = router;