const express = require('express');
const router = express.Router();

const Test = require('../models/test');
const User = require('../models/user'); // This is for testing purposes. Delete later

const { showIndex, showTest } = require('../controllers/test');
const { getTests, getTest } = require('../middleware/test');

router
  .route('/')
  .get(getTests, showIndex)
  .post(function (req, res) {
    let { name, avatar } = req.body;
    console.log(
      Test.create({
        name,
        avatar
      }).then((data) => {
        res.status(200).send(data);
      })
    );
  });

// REMOVE LATER -> THIS IS FOR TESTING PURPOSES ONLY!!

router.route('/user').get(function (req, res) {
  User.find()
    .then((result) => {
      console.log(result);
    })
    .then((_) => {
      res.status(200).send('Done');
    });
});

/*****************************************************/

router.route('/add').put(async function (req, res) {
  // const user = await User.findByIdAndUpdate(
  //   '5f931a3bfd0ebd1a646ae168',
  //   req.body
  // );

  let gameId = req.body.id;
  const game = await Test.findById(gameId);

  const user = await User.findByIdAndUpdate('5f931a3bfd0ebd1a646ae168', {
    $push: { games: game }
  });

  // res.status(200).send({
  //   success: true,
  //   message: `Added game to favs.`
  // });

  res.redirect('/api/v1/test');
});

router.route('/:slug').get(getTest, showTest);

// router.route('/:id').put(function (req, res) {
//   console.log(req.body, req.params.id);

//   Test.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   }).then((data) => {
//     res.status(200).send(data);
//   });

router.route('/:id').put(function (req, res) {
  console.log(req.body, req.params.id);

  const one = User.findById('5f931a3bfd0ebd1a646ae168');
  const two = Test.findById(req.body.game); // id of game

  Promise.all([one, two]).then(([user, game]) => {
    user.games.push(game);
    user.save().then((result) => {
      console.log(result);
    });
  });

  // User.findById("5f931a3bfd0ebd1a646ae168").then(user => {

  // })

  // Test.findByIdAndUpdate(req.params.id, req.body, {
  //   new: true,
  //   runValidators: true
  // }).then((data) => {
  //   res.status(200).send(data);
  // });
});

router.route('/create-test').post(function (req, res) {
  console.log(
    Test.create({
      name: 'Lol',
      avatar: 'no-avatar.png'
    }).then((data) => {
      res.status(200).send(data);
    })
  );
});

module.exports = router;
