const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (token) => {
  if (!token) {
    return { success: false, message: 'No token provided' };
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return { success: false, message: 'Token invalid: ' + err };
    }

    return { success: true, decoded: decoded };
  });
};