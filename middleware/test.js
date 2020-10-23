const mongoose = require('mongoose');
const Test = require('../models/test');

exports.getTests = function (req, res, next) {
  console.log('XD');

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
      res.locals.tests = tests;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching tests: ${error.message}`);
      next(error);
    });

  // BELOW

  //   Test.find()
  //     .then((tests) => {
  //       let query;

  //       console.log(queries);

  //       if (req.query.select) {
  //         const fields = req.query.select.replace(/,/g, ' ');
  //         //const fields = req.query.select.replace(/,/g, ' ');
  //         //query = query.select(fields);
  //         console.log('Coco');
  //       }

  //       console.log(queries);

  //       //   if (req.query.sort) {
  //       //     const sortBy = req.query.sort.replace(/,/g, ' ');
  //       //     query = query.sort(sortBy);
  //       //   } else {
  //       //     query = query.sort('createdAt');
  //       //   }

  //       res.locals.tests = tests;
  //       next();
  //     })
  //     .catch((error) => {
  //       console.log(`Error fetching tests: ${error.message}`);
  //       next(error);
  //     });

  //   if (req.query.select) {
  //     const fields = req.query.select.replace(/,/g, ' ');
  //     query = query.select(fields);
  //   }

  //   console.log(queries);

  //   if (req.query.sort) {
  //     const sortBy = req.query.sort.replace(/,/g, ' ');
  //     query = query.sort(sortBy);
  //   } else {
  //     query = query.sort('createdAt');
  //     // query = query.sort('-order');
  //   }

  //   Test.find()
  //     .then((tests) => {
  //       res.locals.tests = tests;
  //       next();
  //     })
  //     .catch((error) => {
  //       console.log(`Error fetching tests: ${error.message}`);
  //       next(error);
  //     });
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
