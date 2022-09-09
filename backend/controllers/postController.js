const Post = require('../models/post');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Get all posts   =>   /api/v1/posts?keyword=apple
exports.allPosts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const postsCount = await Post.countDocuments();

  const apiFeatures = new APIFeatures(Post.find().populate('post_author'), req.query).filter()

  let posts = await apiFeatures.query;

  apiFeatures.pagination(resPerPage)
  posts = await apiFeatures.query;
  
  let filteredPostsCount = posts.length;

  if(!posts) {
    return next(new ErrorHandler('No posts found', 404));
  }
  
  // console.log(req.get('Referrer'));

  res.status(200).json({
    success: true,
    host: req.get('host'),
    postsCount,
    resPerPage,
    filteredPostsCount,
    posts,
    
  })

});

// Get all posts   =>   /api/v1/recentposts
exports.recentPosts = catchAsyncErrors(async (req, res, next) => {
  const limit = req.query.limit;
  const posts = await Post.find({}).populate('post_author').sort({_id:-1}).limit(+limit);

  if(!posts) {
    return next(new ErrorHandler('No posts found', 404));
  }

  res.status(200).json({
    success: true,
    posts
  })
});


// Get single product details   =>   /api/v1/post/:slug
exports.getSinglePost = catchAsyncErrors(async (req, res, next) => {
  const post = await Post.findOne({post_name: req.params.slug}).populate('post_author');

  if(!post) {
    return next(new ErrorHandler('Post not found', 404));
  }

  res.status(200).json({
    success: true,
    post: post
  })
  
})