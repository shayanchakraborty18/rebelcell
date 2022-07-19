const mongoose = require('mongoose');


const connectDatabase = async () => {
  try{
    const con = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB database has been connected with HOST: ${con.connection.host}`);
  } catch(e) {
    console.log(e)
  }
 
}

module.exports = connectDatabase;