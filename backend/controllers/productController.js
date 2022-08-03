const Product = require('../models/product');
const ProductCategories = require('../models/productCategories');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');


// Get all products   =>   /api/v1/products?keyword=apple
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 20;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find().populate('post_author'), req.query)
        .search()
        .stockFilter()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;

      res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})


// Get single product details   =>   /api/v1/product/:slug
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findOne({slug: req.params.slug}).populate('post_author');


  if(!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

    res.status(200).json({
    success: true,
    product: product
  })
  
})


// Get single product details   =>   /api/v1/product/:id
exports.getSingleProductById = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id).populate('post_author');


  if(!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

    res.status(200).json({
    success: true,
    product: product
  })
  
})

// Get all categories  => /api/v1/categories

exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await ProductCategories.find().populate('category_author');

  if(!categories) {
    return next(new ErrorHandler('Categories not found', 404));
  }

    res.status(200).json({
    success: true,
    categories: categories
  })
  
})


exports.getProductsByCategory = catchAsyncErrors(async (req, res, next) => {
  const catSlug = req.params.catslug;
  const resPerPage = 20;

  const category = await ProductCategories.findOne({category_slug: catSlug});
  const catId = category._id;

  const productsCount = await Product.find({category: catId}).countDocuments();

  const apiFeatures = new APIFeatures(Product.find({category: catId}).populate('category_author'), req.query)
        .search()
        .stockFilter()
        .filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query;

  res.status(200).json({
      success: true,
      productsCount,
      resPerPage,
      filteredProductsCount,
      products
  })
});