const mongoose = require('mongoose');
const valid = require('validator');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Tag', tagSchema)