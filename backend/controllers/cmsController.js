const Cms = require('../models/cmspage');
const Contact = require('../models/contact');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');


// Create a new order   =>  /api/v1/contact/new
exports.newContact = catchAsyncErrors(async (req, res, next) => {
  const {name, email, subject, company_name, telephone, message} = req.body;

  const contact = await Contact.create({
    name,
    email,
    subject,
    company_name,
    telephone,
    message
  });

  if(contact) {
    try {
      await sendEmail({
        email: 'codescapers@gmail.com',
        subject: 'New Contact',
        message: `
          A new contact has been created
          Name: ${name}
          Email: ${email}
          Subject: ${subject},
          Company Name: ${company_name},
          Telephone: ${telephone},
          Message: ${message}
        `
      });

      res.status(200).json({
        success: true,
        message: 'Contact created successfully',
        contact
      })
 
    } catch(err) {
      return next(new ErrorHandler('There is an error for send email', 404));
    }
  } else {
    return next(new ErrorHandler('There is an error for send email', 404));
  }
})
