const express = require('express'); //
const router = express.Router(); //

const {
  allPosts,
  recentPosts,
  getSinglePost,
} = require('../controllers/postController');

// Get all posts
router.get('/posts', allPosts)
router.get('/recentposts', recentPosts)
router.get('/post/:slug', getSinglePost)

module.exports = router;