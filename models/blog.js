const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const valid = require('validator');
const tag = require('./tag');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let lengthChecker = (type, min, max) => {
  if (!type) {
    return false;
  }
  if (type.length < min || type > max) {
    return false;
  }
  return true;
}

const titleValidators = [{
    validator: (title) => { return lengthChecker(title, 3, 50)},
    message: 'Title must consist of at least 3 characters but no more than 50'
  },
  {
    validator: valid.isAlphanumeric,
    message: 'Title must be alphanumeric'
}];

const summaryValidators = [{
  validator: (body) => { return lengthChecker(body, 100, 500)},
  message: 'Body must consist of at least 100 characters but no more than 500'
}];

const bodyValidators = [{
  validator: (body) => { return lengthChecker(body, 100, 10000)},
  message: 'Body must consist of at least 100 characters but no more than 10000'
}];

const blogSchema = new Schema({
  title: { type: String, required: true, validator: titleValidators },
  summary: { type: String, required: true, validator: summaryValidators },
  body: { type: String, required: true, validator: bodyValidators },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  editedBy: {type: String},
  editedAt: {type: Date, default: Date.now},
  tags: [tag]
});

module.exports = mongoose.model('Blog', blogSchema)