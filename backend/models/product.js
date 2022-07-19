const mongoose = require('mongoose'); 

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters']
  },
  slug: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    maxLength: [5, 'Product name cannot exceed 5 characters'],
    default: 0.0
  },
  description: {
      type: String,
  },
  short_description: {
      type: String,
  },
  important_info: {
      type: String,
  },
  details_specification: {
      type: String,
  },
  featured_image: {
    type: String,
  },
  category: {
      type: String,
      required: [true, 'Please select category for this product'],
  },
  seller: {
      type: String,
      required: [true, 'Please enter product seller']
  },
  stock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      maxLength: [5, 'Product name cannot exceed 5 characters'],
      default: 0
  },
  availibility: {
      type: String,
      required: [true, 'Please enter product availibility']
  },
  post_author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);