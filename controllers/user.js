exports.showUser = function (req, res) {
  let user = res.locals.user;
  res.render('users/user', { user });
};
