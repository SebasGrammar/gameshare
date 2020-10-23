const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema({
  name: String,
  games: [
    {
      type: ObjectId,
      ref: 'Test'
    }
  ]
});

module.exports = model('User', UserSchema);
