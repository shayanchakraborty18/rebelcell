const express = require('express'); //
const router = express.Router(); //

const {
getProducts,
getSingleProduct,
getAllCategories,
getProductsByCategory,
getSingleProductById,
} = require('../controllers/productController');

router.route('/products').get(getProducts);
router.route('/product/:slug').get(getSingleProduct);
router.route('/productbyid/:id').get(getSingleProductById);
router.route('/categories').get(getAllCategories);
router.route('/products/:catslug').get(getProductsByCategory);


module.exports = router;