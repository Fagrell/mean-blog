const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (token, callback) => {
  if (!token) {
    return callback('No token provided', null);
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
     return callback('Token invalid: ' + err, null);
    }

    return callback(null, decoded);
  });
};
