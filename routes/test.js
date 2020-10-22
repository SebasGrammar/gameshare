const express = require('express');
const router = express.Router();

const Test = require('../models/test');

const { showIndex } = require('../controllers/test');

router
  .route('/')
  .get(showIndex)
  .post(function (req, res) {
    console.log(
      Test.create({
        name: 'Lol',
        avatar: 'no-avatar.png'
      }).then((data) => {
        res.status(200).send(data);
      })
    );
  });

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
