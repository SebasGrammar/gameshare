const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const TestSchema = new Schema({
  name: String,
  avatar: String
});

module.exports = model('Test', TestSchema);
