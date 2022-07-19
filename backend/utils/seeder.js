const User = require('../models/user');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

// include the user json
const users = require('../data/users.json');

// Setting up the config file
dotenv.config({ path: 'backend/config/config.env'});

// connnect with database
connectDatabase();

const seedUsers = async () => {
  try {
    await User.deleteMany();
    console.log('All users deleted Successfully');

    // await User.insertMany(users);
    // console.log('All users inserted Successfully');

    const user = {
    "name": "Shayan",
    "email": "admin@admin.com",
    "password": "123456",
    "avatar": "",
    "role": "admin",
    "resetPasswordToken": "",
    "resetPasswordExpire": ""
  };

  await User.create(user);
  console.log('All users inserted Successfully');

  } catch(err) {
    console.log(err);
    process.exit();
  }
}

seedUsers();
