const express = require('express'); //
const router = express.Router(); //

const {
getProducts,
getSingleProduct,
getAllCategories,
getProductsByCategory

} = require('../controllers/productController');

router.route('/products').get(getProducts);
router.route('/product/:slug').get(getSingleProduct);
router.route('/categories').get(getAllCategories);
router.route('/products/:catslug').get(getProductsByCategory);


module.exports = router;