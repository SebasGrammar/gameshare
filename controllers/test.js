const Test = require('../models/test');

// I'm definitely going to create middleware functions for when I have to retrieve stuff from the DB.
exports.showIndex = function (req, res) {
  res.render('index');
};


