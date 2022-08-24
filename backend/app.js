const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');

const errorMiddleware = require('./middlewares/errors');

//init app
const app = express();

// Setting up the config file
if(process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' });

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//public folder setup
app.use(express.static(path.join(__dirname, 'public')));

// add middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());

// express session middleware
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: 'mySessions'
});
// Catch errors
store.on('error', function(error) {
  console.log(error);
});
app.use(session({
  secret: 'thisismysecrctekeyfhrgfgrfrty84fwir767',
  saveUninitialized: true,
  resave: true,
  store: store
}))

app.use(function(req, res, next) {
  res.locals.query = req.query;
  res.locals.url   = req.originalUrl;
  next();
})
// Express Validator middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  },
  customValidators: {
    isImage: function (value, filename) {
      var extension = (path.extname(filename)).toLowerCase();
      switch (extension) {
        case '.jpg':
          return '.jpg';
        case '.jpeg':
          return '.jpeg';
        case  '.png':
          return '.png';
        default:
          return false;
      }
    }
  }
}));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  res.locals.errors = req.session.errors;
  next();
});

//setup global errors to null
app.locals.errors = null;

//express fileupload middleware
app.use(fileUpload({createParentPath: true,}));

app.get('*', function(req, res, next) {
  res.locals.user = req.session.user || null;  //set current user as global variable
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});

app.get('/admin', (req, res) => {
  res.redirect('/admin/login')
})

// Import all the routes
const adminRoutes = require('./routes/adminRoutes');
const postRoutes = require('./routes/postRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cmsRoutes = require('./routes/cmsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/admin',   adminRoutes);
app.use('/api/v1',  postRoutes);
app.use('/api/v1',  productRoutes);
app.use('/api/v1',  authRoutes);
app.use('/api/v1',  orderRoutes);
app.use('/api/v1',  cmsRoutes);
app.use('/api/v1',  paymentRoutes);

if(process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  })
}

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;