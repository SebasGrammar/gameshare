const express = require('express');
const router = express.Router();

const Test = require('../models/test');
const User = require('../models/user'); // This is for testing purposes. Delete later

const { showIndex, showTest } = require('../controllers/test');
const { getTests, getTest, createTest } = require('../middleware/test');
const { saveGame } = require('../middleware/user');

router.route('/').get(getTests, showIndex).post(createTest);

// REMOVE LATER -> THIS IS FOR TESTING PURPOSES ONLY!!

// router.route('/user').get(function (req, res) {
//   User.find()
//     .then((result) => {
//       console.log(result);
//     })
//     .then((_) => {
//       res.status(200).send('Done');
//     });
// });

/*****************************************************/

// router.route('/add').put(async function (req, res) {
//   let gameId = req.body.id;
//   const game = await Test.findById(gameId);

//   const user = await User.findByIdAndUpdate('5f931a3bfd0ebd1a646ae168', {
//     $push: { games: game }
//   });

//   res.status(200).send({
//     success: true,
//     message: `Added game to favs.`
//   });
// });

router.route('/:slug').get(getTest, showTest);

// Users id. This should go in User (routes).
router.route('/:id').put(saveGame);
// https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
router.route('/create-test').post(function (req, res) { // create game
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
