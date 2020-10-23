const mongoose = require('mongoose');
const User = require('./models/user');
const dotenv = require('dotenv');

dotenv.config({
  path: './config/config.env'
});

const { DB_IP, DB_PORT, DB_NAME } = process.env;
const PORT = process.env.SERVER_PORT || 3000;

mongoose.connect(`mongodb://${DB_IP}:${DB_PORT}/${DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

User.deleteMany().then((_) => {
  User.create({
    name: 'Sebastian'
  }).then((user) => {
    console.log(`User ${user.name} was created successfully.`);
    process.exit();
  });
});

// User.create({
//   name: 'Sebastian'
// }).then((user) => {
//   console.log(`User ${user.name} was created successfully.`);
//   process.exit();
// });
