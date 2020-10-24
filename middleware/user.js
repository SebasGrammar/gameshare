const mongoose = require('mongoose');
const User = require('../models/user');
const Test = require('../models/test');

exports.getUser = function (req, res, next) {
  let userId = req.params.id;
  const user = User.findById(userId).populate('games');

  user.then((user) => {
    res.locals.user = user;
    // res.send({
    //   success: true,
    //   data: user
    // });
    next();
  });
  //   const User = User.findById('');
};

// LOL this is not middleware... I have to put split this and put the coresponding it in he tonctrolers.
exports.saveGame = function (req, res) {
  const userPromise = User.findById('5f93577b21443d3f58cde966');
  const gamePromise = Test.findById(req.body.game); // id of game

  Promise.all([userPromise, gamePromise]).then(([user, game]) => {
    if (user.games.includes(game._id)) {
      user.games.pull(game);
      user.save().then((result) => {
        res.status(200).json({
          // I know I can refactor this to avoid repeated code. DRY.
          success: true,
          message: `Game removed from favs.`
        });
      });
    } else {
      user.games.push(game);
      user.save().then((result) => {
        res.status(200).json({
          success: true,
          data: result
        });
      });
    }
  });
  //   if (user.games.includes(game._id)) {
  //     res.status(400).json({
  //       success: false,
  //       message: `${game.name} is already saved.`
  //     });
  //   } else {
  //     user.games.push(game);
  //     user.save().then((result) => {
  //       res.status(200).json({
  //         success: true,
  //         data: result
  //       });
  //     });
  //   }
  // });

  // User.findById("5f931a3bfd0ebd1a646ae168").then(user => {

  // })

  // Test.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true
  // }).then((data) => {
  //   res.status(200).send(data);
  // });
};

exports.getLikes = function (req, res) {
  
};
