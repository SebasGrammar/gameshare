const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const slugify = require('slugify');

const TestSchema = new Schema({
  name: String,
  avatar: String,
  platform: String,
  slug: { type: String, required: true, unique: true }
});

TestSchema.pre('validate', function (next) {
  let name = this.name;
  if (name) {
    this.slug = slugify(name, {
      lower: true,
      strict: true
    });
  }
  next();
});

module.exports = model('Test', TestSchema);
