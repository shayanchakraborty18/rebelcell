const mongoose = require('mongoose');

const productCategoriesSchema = mongoose.Schema({
  category_name: {
    type: 'String',
    required: true
  },
  category_slug: {
    type: 'String',
  },
  category_content: {
    type: 'String',
  },
  category_author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  category_image: {
    type: 'String',
  },
  category_logo: {
    type: 'String',
  },
  category_status: {
    type: 'String',
    default: 'publish',
    enum: {
      values: [
          'publish',
          'draft',
          'private'
      ],
    }
  },
  created_at: {
    type: Date,
    default: Date.now()
  }
}, { collection: 'productCategories' });

module.exports = mongoose.model('ProductCategories', productCategoriesSchema);