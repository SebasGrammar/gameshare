const express = require('express');
const router = express.Router();

const Test = require('../models/test');
const User = require('../models/user');

const { getUser } = require('../middleware/user');
const { showUser } = require('../controllers/user');

router.route('/:id').get(getUser, showUser);

module.exports = router;
