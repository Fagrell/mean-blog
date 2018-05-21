const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const valid = require('validator');

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

const bodyValidators = [{
  validator: (body) => { return lengthChecker(body, 100, 10000)},
  message: 'Body must consist of at least 100 characters but no more than 10000'
},
{
  validator: valid.isEmail,
  message: 'E-mail is incorrect'
}];

const blogSchema = new Schema({
  title: { type: String, required: true, validator: titleValidators },
  body: { type: String, required: true, validator: bodyValidators },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
  editBy: {type: String},
  changedAt: {type: Date}
});

module.exports = mongoose.model('Blog', blogSchema)