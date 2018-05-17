const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
  router.post('/register', (req, res) => {
    if (!req.body.email) {
      return res.json({ sucess: false, message: 'You need to provide an e-mail.'});
    }

    if (!req.body.username) {
      return res.json({ sucess: false, message: 'You need to provide a username'});
    }

    if (!req.body.password) {
      return res.json({ sucess: false, message: 'You need to provide a password'});
    }

    let user = new User({
      email: req.body.email.toLowerCase(),
      username: req.body.username.toLowerCase(),
      password: req.body.password
    });
    user.save((err) => {
      if (err) {

        if (err.errors) {
          if (err.errors.email) {
            return res.json({ sucess:false, message: err.errors.email.message});
          }
          if (err.errors.username) {
            return res.json({ sucess:false, message: err.errors.username.message});
          }
          if (err.errors.password) {
            return res.json({ sucess:false, message: err.errors.password.message});
          }
          return res.json({ sucess:false, message: 'Could not save user. Error ' + err});
        }

        switch(err.code) {
          case 11000:
            return res.json({ sucess:false, message: 'Username or e-mail already exists'});
          default:
            return res.json({ sucess:false, message: 'Could not save user. Error ' + err});
        }
      }
      return res.json({ sucess: true, message: 'User registered!'});
    });


  });

  router.post('/login', (req, res) => {
    if (!req.body.username) {
      return res.json({ sucess: false, message: 'You need to provide a username'});
    }

    if (!req.body.password) {
      return res.json({ sucess: false, message: 'You need to provide a password'});
    }

    User.findOne( { username: req.body.username.toLowerCase() }, (err, user) => {
      if (err) {
        return res.json({ sucess: false, message: err});
      }

      if (!user) {
        return res.json({ sucess: false, message: 'Username could not be found'})
      }

      if (!user.comparePassword(req.body.password)) {
        return res.json({ sucess: false, message: 'Wrong username or password'});
      }

      const token = jwt.sign({ userId: user._id}, config.secret, { expiresIn: '24h'});
      return res.json({ sucess: true, message: 'Logging in...', token: token, user: { username: user.username }});
    });
  });

  router.use((req, res, next) => {
    const token = req.headers['auth'];
    if (!token) {
      return res.json({ sucess: false, message: 'No token provided'});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({ sucess: false, message: 'Token invalid: ' + err });
      }

      req.decoded = decoded;
      next();
    });
  });

  router.get('/profile', (req, res) => {
    User.findOne({ _id : req.decoded.userId}).select('username email').exec((err, user) => {
      if (err) {
        return res.json({ sucess: false, message: err});
      }

      if (!user) {
        return res.json({ sucess: false, message: 'User could not be found'})
      }

      return res.json({ sucess: true, user: user});
    });
  });

  return router;
}