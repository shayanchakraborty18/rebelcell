const app = require('./app');
const connectDatabase = require('./config/database');

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})


//connecting database
connectDatabase();


const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT:${process.env.PORT} on ${process.env.NODE_ENV}`)
})


// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
    process.exit(1);
  })
})