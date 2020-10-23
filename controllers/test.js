const Test = require('../models/test');

// I'm definitely going to create middleware functions for when I have to retrieve stuff from the DB.
exports.showIndex = function (req, res) {
  let tests = res.locals.tests;
  res.render('index', {
    tests
  });
};

exports.showTest = function (req, res) {
  let test = res.locals.test;
  res.render('test', {
    test
  });
};
