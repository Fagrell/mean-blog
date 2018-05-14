const User = require('../models/user');

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
  return router;
}