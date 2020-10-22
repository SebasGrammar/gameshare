const express = require('express');
const app = express();
const mongoose = require('mongoose');
const layouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

dotenv.config({
  path: './config/config.env'
});

app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET']
  })
);

app.use(express.json());

// Set static folder for files that are going to be served by the server
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(layouts);

const { DB_IP, DB_PORT, DB_NAME } = process.env;
const PORT = process.env.SERVER_PORT || 3000;

mongoose.set('useFindAndModify', false);
mongoose
  .connect(`mongodb://${DB_IP}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((connection) => {
    console.log(
      `Connection with MongoDB established on ${connection.connection.host}:${connection.connection.port}`
    );
  });

const test = require('./routes/test');
app.use('/api/v1/test', test);

const server = app.listen(
  PORT,
  console.log(`Server listening on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`);
  // Close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
