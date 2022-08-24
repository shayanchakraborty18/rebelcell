const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// Create a new user  => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const {name, email, password} = req.body;

  const userExist = await User.findOne({email});

  if(userExist) {
    return next(new ErrorHandler('Email is already registered'), 401);
  }

  const user = await User.create({
    name,
    email,
    password
  });

  sendToken(user, 200, res);
});

// Login user  => /api/v1/login
exports.loginUser = catchAsyncErrors(async(req, res, next) => {

  const {email, password} = req.body;

  // check if email and password provided by the user
  if(!email || !password) {
    return next(new ErrorHandler('Please enter a valid email and password'), 400);
  }

  // Findiing the user in database
  const user = await User.findOne({email}).select('+password');

  if(!user) {
    return next(new ErrorHandler('Invalid email or password'), 401);
  }

  // Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password'), 401);
  }

  sendToken(user, 200, res);
});


// User Logout => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User Logged out successfully'
  })
});

// Forgeot password =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res,next) => {
  const user = await User.findOne({email: req.body.email});

  if(!user) {
    return next(new ErrorHandler('User not found with this email address'), 404);
  }

  // Get the reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({validateBeforeSave: false});

  //Create reset password URL
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'ShopIT Password Recovery',
      message
    });

    res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`
    })

  } catch(error) {

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return next(new ErrorHandler(error.message), 500);
  }

});

// Reset Password   =>  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user) {
    return next(new ErrorHandler('Password reset token is invalid or has been expired'), 400);
  }

  if(req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match'), 400);
  }

  //Setup a new  password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get currently logged in user details   =>   /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })  
});


// Update / Change password   =>  /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect'));
    }

    user.password = req.body.password;

    await user.save();

    sendToken(user, 200, res)

})

// Update user profile   =>   /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
