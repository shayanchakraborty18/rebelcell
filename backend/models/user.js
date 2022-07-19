const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    maxlength:[30, 'Please enter name maximum 30 charecter']
  },
  email: {
    type: String,
    required: [true, 'Please enter email address'],
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [6, 'Your password must be at least 6 characters'],
    select: false
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  resetPasswordToken: String,
  resetPasswordExpire: String
},{ collection: 'users' });



// Encrypting password before saving user
userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);