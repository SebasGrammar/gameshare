const mongoose = require('mongoose');
const Test = require('../models/test');
// FOR TESTING PURPOSES ONLY
const User = require('../models/user');

// This should be in another function, don't know yet whether in controllers or what... This is here for testing purposes only.
// Logged in middleware ... if user is logged in... get likes and such.
function getLikes() {
  const user = User.findById('5f93577b21443d3f58cde966'); // user id
  user.then((result) => {});
}

/*******************************/

exports.getTests = async function (req, res, next) {
  console.log('XD');

  /* THIS SHOULD GO IN ANOTHER FUNCTION. I?M JUST DOING SOME TESTS! */

  // if user is logged in:
  const user = await User.findById('5f93577b21443d3f58cde966');
  let likes = user.games;

  /************* TEST ABOVE *************/

  const queries = { ...req.query };

  // Excluse fields we don't want to be matched in URL
  const removeFields = ['select', 'sort', 'page', 'limit'];

  removeFields.forEach((parameter) => delete queries[parameter]);

  let query = Test.find(queries);

  if (req.query.select) {
    const fields = req.query.select.replace(/,/g, ' ');
    query = query.select(fields);
  }

  console.log(queries);

  if (req.query.sort) {
    const sortBy = req.query.sort.replace(/,/g, ' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('createdAt');
  }

  query
    .then((tests) => {
      res.locals.likes = likes;
      res.locals.tests = tests;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching tests: ${error.message}`);
      next(error);
    });
};

exports.getTest = function (req, res, next) {
  let { slug } = req.params;
  console.log(slug);
  Test.findOne({ slug })
    .then((test) => {
      console.log(test);
      res.locals.test = test;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching test: ${error.message}`);
      next(error);
    });
};

exports.createTest = function (req, res) {
  let { name, avatar } = req.body;
  console.log(
    Test.create({
      name,
      avatar
    }).then((data) => {
      res.status(200).send(data);
    })
  );
};
