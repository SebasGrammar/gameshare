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

router.route('/add').put(async function (req, res) {
  const user = await User.findByIdAndUpdate(
    '5f9253dd24ee550ddc8f4504',
    req.body
  );
  // const game = await Test.findById()

  console.log(req.body);

  res.status(200).send({
    success: true,
    message: `Added game to favs.`
  });
});

router.route('/:slug').get(getTest, showTest);

router.route('/:id').put(function (req, res) {
  console.log(req.body, req.params.id);

  Test.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).then((data) => {
    res.status(200).send(data);
  });

  //   https://stackoverflow.com/questions/36211456/promises-without-then
  //   const test = Test.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true
  //   }); // If I leave this as it is, the code won't work! but if I add a then, or even just a catch, it will work... wonder why?
  //   const test = Test.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true,
  //     runValidators: true
  //   }).catch((error) => { // this works...
  //     console.log(error);
  //   });
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
