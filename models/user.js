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

let validPassword = (password) => {
  if (!password) {
    return false;
  }
  const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,30}$/);
  return regExp.test(password);
}

const emailValidators = [{
    validator: (email) => { return lengthChecker(email, 5, 30)},
    message: 'E-mail must consist of at least 5 characters but no more than 30'
  },
  {
    validator: valid.isEmail,
    message: 'E-mail is incorrect'
}];

const usernameValidators = [{
    validator: (username) => { return lengthChecker(username, 3, 30)},
    message: 'Username must consist of at least 3 characters but no more than 30'
  },
  {
    validator: valid.isAlphanumeric,
    message: 'Username must be alphanumeric'
}];

const passwordValidators = [{
  validator: validPassword,
  message: 'Password must consist of at least 8 characters but no more than 30, at least one uppercase letter, one lowercase letter, one number and one special character'
}];

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
  password: { type: String, required: true, validate: passwordValidators },
});

userSchema.pre('save', function(next)  {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    return next();
  });
});

userSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
}


module.exports = mongoose.model('User', userSchema);