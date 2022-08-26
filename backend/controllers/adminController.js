const User = require('../models/user');
const Post = require('../models/post');
const ProductCategories = require('../models/productCategories');
const Product = require('../models/product');
const Contact = require('../models/contact');
const Order = require('../models/order');
const bcrypt = require("bcrypt");
const path = require('path');

var mkdirp = require('mkdirp');
var fs = require('fs-extra');
var resizeImg = require('resize-img');

// show admin login form => /admin/login
exports.showLoginForm = (req, res, next) => {
  if(res.locals.user) res.redirect('/admin/dashboard');
  res.render('admin/login');
}


// show admin login form => /admin/dashboard
exports.showDashboard = (req, res, next) => {
  // res.send(res.locals.user);
  res.render('admin/dashboard', {
    title: 'Dashboard'
  });
}

// Post Login
exports.adminLoginAction = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email }).select('+password');

  if(user) {
    // check for valid password
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword) {
      req.session.isAuthenticated = true;
      req.session.user = user;
      res.status(200).json({ message: "Logged In Successful" , redirect_url: '/admin/dashboard' });
    } else {
      res.status(401).json({ error: 'Password Not match'});
    }
  } else {
    res.status(401).json({ error: 'User does not exist'});
  }
} 

// logout 
exports.adminLogoutAction =  (req, res, next) => {
  req.flash('success', 'You are logged out!');
  req.session.destroy(() => {
    res.redirect('/admin/login/?logged_out=success');
  })
}


// blog 
exports.blogList = async (req, res, next) => {

  const allPosts = await Post.find({}).populate('post_author');
  
  if(!allPosts) {
    return console.log('No posts found');
  }

  res.render('admin/bloglist', {
    title: 'Blog List',
    allPosts: allPosts
  })
}

// add new blog post
exports.addNewPost = (req, res, next) => {
  const user = req.session.user;
  res.render('admin/add-post', {
    title: 'Add Post',
    user: user
  })
}



//add new post action

exports.addNewPostAction =  (req, res, next) => {
  const user = req.session.user;
  let newFileName;

  let imageFile = req.files ? req.files.featuredimage : '';
  // const imageFile = typeof req.file.featuredimage !== "undefined" ? req.files.featuredimage.name : "";

  if(imageFile !== '') {
    const tmp_path = imageFile.path;
    const fileName = imageFile.name;
    const file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    newFileName = getRandomSalt() + '.' + file_ext;
    req.checkBody('featuredimage', 'You must upload an image').isImage(fileName);
  } else {
    newFileName = '';
  }
  
  req.checkBody('post_title', 'Title must not be Empty').notEmpty();
  req.checkBody('post_name', 'Post slug must not be empty').notEmpty();
	

  const post_title = req.body.post_title;
  const post_name = req.body.post_name;
  const post_content = req.body.post_content;
  const post_author = req.session.user._id;

  const errors = req.validationErrors();

  if(errors) {
    res.render('admin/add-post', {
      title: 'Add Post',
      errors: errors,
      user: user
    });
  } else {
    Post.findOne({post_name: post_name}, (err, post) => {
      if(post) {
        req.flash('danger', 'post slug is already exist');
        res.render('admin/add-post', {
          title: 'Add Post',
          user: user
        });
      } else {
        var post = new Post({
          post_title: post_title,
          post_name:  post_name,
          post_content: post_content,
          featured_image: newFileName,
          post_author: post_author,
          post_status: 'publish',
          post_date:  Date.now()
        });

        post.save((err) => {
          if(err) {
            console.log(err);
          }

          if (newFileName != "") {
						var postImage = req.files.featuredimage;
						var destination_path = path.join(__dirname, '../public/admin_uploads/' + newFileName);

						postImage.mv(destination_path, function (err) {
								return console.log(err);
						});
					}

          req.flash('success', 'Post saved successfully');
          res.render('admin/add-post', {
            title: 'Add Post',
            user: user
          });
        })
      }
    })
  }
}


exports.deletePost = async (req, res) => {
  const post_id = req.params.id;

  let post = await Post.findById(post_id);
  
  if(!post) {
    res.status(201).json({message: 'Post Not Found'});
    return;
  }

  await post.remove();

  res.status(200).json({
    success: true,
    post: post
  });
}


exports.editPost = async (req, res, next) => {
  let post = await Post.findById(req.params.id);
  
  if(!post) {
    res.status(201).json({message: 'Post Not Found'});
    return;
  }

  const user = req.session.user;
  res.render('admin/edit-post', {
    title: 'Edit Post',
    user: user,
    post:post
  })
}



exports.editPostAction =  (req, res, next) => {
  const user = req.session.user;
  const post_id = req.params.id;
  
  const imageFile = req.files ? req.files.featuredimage : '';
  // const imageFile = typeof req.file.featuredimage !== "undefined" ? req.files.featuredimage: "";

  if(imageFile !== '') {
    const tmp_path = imageFile.path;
    const fileName = imageFile.name;
    const file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    newFileName = getRandomSalt() + '.' + file_ext;
    req.checkBody('featuredimage', 'You must upload an image').isImage(fileName);
  } else {
    newFileName = req.body.pimage;
  }

  req.checkBody('post_title', 'Title must not be Empty').notEmpty();
  req.checkBody('post_name', 'Post slug must not be empty').notEmpty();


  const post_title = req.body.post_title;
  const post_name = req.body.post_name;
  const post_content = req.body.post_content;
  const post_author = req.session.user._id;

  const errors = req.validationErrors();
  if(errors) {
    req.session.errors = errors;
    res.redirect(`/admin/edit-post/${post_id}`);
  } else {
    Post.findOne({post_name: post_name, _id: {'$ne': post_id}}, (err, post) => {
      if(post) {
        req.flash('danger', 'post slug is already exist');
        res.redirect(`/admin/edit-post/${post_id}`);
      } else {

        Post.findById(post_id, function (err, post) {
          if(err) {
            return console.log(err);
          }

          post.post_title = post_title;
          post.post_name = post_name;
          post.post_content = post_content;
          post.featured_image = newFileName;
          post.post_author = post_author;
          post.post_status = 'publish';
          post.post_date =  Date.now();

          post.save((err) => {
            if(err) {
              console.log(err);
            }

            if (imageFile !== '') {
              var postImage = req.files.featuredimage;
              var destination_path = path.join(__dirname, '../public/admin_uploads/' + newFileName);

              postImage.mv(destination_path, function (err) {
                  return console.log(err);
              });
            }

            req.flash('success', 'Post Updated successfully');
            res.redirect(`/admin/edit-post/${post_id}`);
          })

        })

        
      }
    })
  }
}

function getRandomSalt() {
    var milliseconds = new Date().getTime();
    var timestamp = (milliseconds.toString()).substring(9, 13)
    var random = ("" + Math.random()).substring(2, 8);
    var random_number = timestamp+random;  // string will be unique because timestamp never repeat itself
    var random_string = random_number.substring(2, 8); // you can set size here of return string
    return random_string;
}

// Product Caegories-------------------------------------------------------------

exports.productCategories = async (req, res) => {
  const allProductCategories = await ProductCategories.find({}).populate('post_author');
  
  if(!allProductCategories) {
    return console.log('No posts found');
  }
  req.session.errors = '';
  res.render('admin/productCategories', {
    title: 'All Categories',
    allProductCategories: allProductCategories
  })
}

exports.addNewProductCategory = (req, res) => {
  // res.redirect('/admin/product-categories');
  // return false;
  const category_image = req.files ? req.files.category_image : '';
  const category_logo  = req.files ? req.files.category_logo : '';

  if(category_image !== '' && category_image !== undefined) {
    let fileName = category_image.name;
    let file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    newCategoryImageFile = getRandomSalt() + '.' + file_ext;
    req.checkBody('category_image', 'You must upload an image').isImage(fileName);
  } else {
    newCategoryImageFile = '';
  }

  if(category_logo !== '' && category_logo !== undefined) {
    let fileName = category_logo.name;
    let file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    newCategoryLogoName = getRandomSalt() + '.' + file_ext;
    req.checkBody('category_logo', 'You must upload an image').isImage(fileName);
  } else {
    newCategoryLogoName = '';
  }

  req.checkBody('category_name', 'Category name must not be Empty').notEmpty();
  req.checkBody('category_slug', 'Category slug must not be empty').notEmpty();

  const category_name = req.body.category_name;
  const category_slug = req.body.category_slug;
  const category_content = req.body.category_content;
  const category_author = req.session.user._id;

  const errors = req.validationErrors();

  if(errors) {
    req.session.errors = errors;
    res.redirect('/admin/product-categories');
  } else {
    ProductCategories.findOne({category_slug: category_slug }, (err, category) => {
      if(category) {
        req.flash('danger', 'category slug is already exist');
        res.redirect(`/admin/product-categories`);
      } else {

         var category = new ProductCategories({
          category_name: category_name,
          category_slug:  category_slug,
          category_content: category_content,
          category_image: newCategoryImageFile,
          category_logo: newCategoryLogoName,
          category_author: category_author,
          category_status: 'publish',
          created_at:  Date.now()
        });


          category.save((err) => {
            if(err) {
              console.log(err);
            }

            if (newCategoryImageFile !== '') {
              var destination_path = path.join(__dirname, '../public/admin_uploads/' + newCategoryImageFile);

              category_image.mv(destination_path, function (err) {
                  return console.log(err);
              });
            }

            if (newCategoryLogoName !== '') {
              var destination_path = path.join(__dirname, '../public/admin_uploads/' + newCategoryLogoName);

              category_logo.mv(destination_path, function (err) {
                  return console.log(err);
              });
            }

            req.flash('success', 'Categories Saved successfully');
            res.redirect(`/admin/product-categories`);
          });
        
      }
    })
  }

}

exports.editProductCategory = async (req, res) => {
  let category = await ProductCategories.findById(req.params.catid);
  const allProductCategories = await ProductCategories.find({}).populate('post_author');
  if(!category) {
    res.status(201).json({message: 'Post Not Found'});
    return;
  }

  // const user = req.session.user;
  res.render('admin/productCategoryEdit', {
    title: 'Edit Category',
    category:category,
    allProductCategories: allProductCategories
  })
  
}

exports.editProductCategoryAction = (req, res) => {
  const user = req.session.user;
  const catid = req.params.catid;

  const category_image = req.files ? req.files.category_image : '';
  const category_logo  = req.files ? req.files.category_logo : '';

  if(category_image !== '' && category_image !== undefined) {
    let fileName = category_image.name;
    let file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    newCategoryImageFile = getRandomSalt() + '.' + file_ext;
    req.checkBody('category_image', 'You must upload an image').isImage(fileName);
  } else {
    newCategoryImageFile =  req.body.old_category_image;
  }

  if(category_logo !== '' && category_logo !== undefined) {
    let fileName = category_logo.name;
    let file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    newCategoryLogoName = getRandomSalt() + '.' + file_ext;
    req.checkBody('category_logo', 'You must upload an image').isImage(fileName);
  } else {
    newCategoryLogoName =  req.body.old_category_logo;
  }

  req.checkBody('category_name', 'Category name must not be Empty').notEmpty();
  req.checkBody('category_slug', 'Category slug must not be empty').notEmpty();

  const category_name = req.body.category_name;
  const category_slug = req.body.category_slug;
  const category_content = req.body.category_content;
  const category_author = req.session.user._id;

  const errors = req.validationErrors();
  if(errors) {
    req.session.errors = errors;
    res.redirect(`/admin/edit-product-category/${catid}`);
  } else {
    Post.findOne({category_slug: category_slug, _id: {'$ne': catid}}, (err, category) => {
      if(category) {
        req.flash('danger', 'post slug is already exist');
        res.redirect(`/admin/edit-product-category/${catid}`);
      } else {

        ProductCategories.findById(catid, function (err, category) {
          if(err) {
            return console.log(err);
          }

          category.category_name = category_name;
          category.category_slug = category_slug;
          category.category_content = category_content;
          category.category_image = newCategoryImageFile;
          category.category_logo = newCategoryLogoName;
          category.category_author = category_author;
          category.category_status = 'publish';
          category.created_at =  Date.now();

          category.save((err) => {
            if(err) {
              console.log(err);
            }

            if (category_image) {
              var destination_path = path.join(__dirname, '../public/admin_uploads/' + newCategoryImageFile);

              category_image.mv(destination_path, function (err) {
                  return console.log(err);
              });
            }

            if (category_logo) {
              var destination_path = path.join(__dirname, '../public/admin_uploads/' + newCategoryLogoName);

              category_logo.mv(destination_path, function (err) {
                  return console.log(err);
              });
            }

            req.flash('success', 'Category Updated successfully');
            res.redirect(`/admin/edit-product-category/${catid}`);
          });
        });
      }
    })
  }
}


exports.deleteProductCategoryAction = async (req, res) => {
  const catid = req.params.catid;

  let category = await ProductCategories.findById(catid);
  
  
  if(!category) {
    res.status(201).json({message: 'Category Not Found'});
    return;
  }

  await category.remove();

  res.status(200).json({
    success: true,
    category: category
  });
}


// Product Categories-------END------------------------------------------------------

// Product-------Start----------------------------------------------------

exports.allProducts = async (req, res) => {
  const allProduct = await Product.find({}).populate('post_author');
  
  if(!allProduct) {
    return console.log('No Product found');
  }
  req.session.errors = '';
  res.render('admin/all-products', {
    title: 'All Products',
    allProduct: allProduct
  })
}

exports.addNewProduct = async (req, res) => {
  const allProductCategories = await ProductCategories.find({});
  
  res.render('admin/add-product', {
    title: 'Add Product',
    allProductCategories: allProductCategories
  });
}

exports.addNewProductAction = (req, res) => {
  const featured_image = req.files ? req.files.featured_image : '';

  if(featured_image !== '' && featured_image !== undefined) {
    let fileName = featured_image.name;
    let file_ext = fileName.substr((Math.max(0, fileName.lastIndexOf(".")) || Infinity) + 1);
    newProductImageFile = getRandomSalt() + '.' + file_ext;
    req.checkBody('featured_image', 'You must upload an image').isImage(fileName);
  } else {
    newProductImageFile = '';
  }

  req.checkBody('product_name', 'Please enter product name').notEmpty();
  req.checkBody('product_slug', 'Please enter product slug').notEmpty();
  req.checkBody('product_price', 'Please enter product price').notEmpty();
  req.checkBody('product_category', 'Please enter product category').isLength({min: 1});
  req.checkBody('product_seller', 'Please enter product seller').notEmpty();
  req.checkBody('product_stock', 'Please enter product stock').notEmpty();
  req.checkBody('product_availibility', 'Please select product availability').notEmpty();

  const name = req.body.product_name;
  const slug = req.body.product_slug;
  const price = req.body.product_price;
  const description = req.body.description;
  const short_description = req.body.short_description;
  const important_info = req.body.important_info;
  const details_specification = req.body.details_specification;
  const category = req.body.product_category;
  const seller = req.body.product_seller;
  const stock = req.body.product_stock;
  const availibility = req.body.product_availibility;
  const post_author = req.session.user._id;


  const errors = req.validationErrors();
  if(errors) {
    req.session.errors = errors;
    res.redirect('/admin/add-product');
  } else {
    Product.findOne({slug: slug }, (err, product) => {
      if(product) {
        req.flash('danger', 'product slug is already exist');
        res.redirect('/admin/add-product');
      } else {

         var product = new Product({
          name: name,
          slug:  slug,
          price: price,
          description: description,
          short_description: short_description,
          important_info: important_info,
          details_specification: details_specification,
          category: category,
          seller: seller,
          stock: stock,
          availibility: availibility,
          post_author: post_author,
          featured_image: newProductImageFile,
          createdAt:  Date.now()
        });


          product.save((err) => {
            if(err) {
              console.log(err);
            }

            if (featured_image) {
              var destination_path = path.join(__dirname, '../public/admin_uploads/' + newProductImageFile);

              featured_image.mv(destination_path, function (err) {
                  return console.log(err);
              });
            }

            req.flash('success', 'Product created successfully');
            res.redirect('/admin/add-product');
          });
        
      }
    })
  }

}

exports.editProduct = (req, res) => {

}

exports.editProductAction = (req, res) => {

}

exports.deleteProductAction = async (req, res) => {
    const productid = req.params.productid;

  let product = await Product.findById(productid);
  
  
  if(!product) {
    res.status(201).json({message: 'Product Not Found'});
    return;
  }

  await product.remove();

  res.status(200).json({
    success: true,
    product: product
  });
}


// Product-------END----------------------------------------------------

// all contacts
exports.getAllContacts = async (req, res) => {
  const contacts = await Contact.find();

  if(!contacts) {
    res.status(201).json({message: 'Contacts Not Found'});
    return;
  }

  res.render('admin/contacts', {
    title: 'All Contacts',
    contacts: contacts
  });
}

//all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user');
  // res.send(orders);
  if(!orders) {
    res.status(201).json({message: 'Orders Not Found'});
    return;
  }

  res.render('admin/all-orders', {
    title: 'All Orders',
    orders: orders
  });
}