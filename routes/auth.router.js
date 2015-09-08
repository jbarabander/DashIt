var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var query = User.findOne({username: username}).select('+passwordHash');
  query.exec(function(err, user) {
    if(err) return next(err);
    user.authenticate(password, function(err, result) {
      if(err) return next(err);
      if(result) return req.login(user, function() {
        delete user.passwordHash;
        res.json(user);
      });
      var error = new Error('authentication failed');
      error.status = 403;
      next(error);
    });
  });
});

router.post('/register', function(req, res, next) {
  User.create(req.body, function(err, user) {
    if(err) return next(err);
    req.login(user, function() {
      res.json(user);
    });
  });
});

router.post('/logout', function(req, res, next) {

});

router.get('/me', function(req, res, next) {
  res.json(req.user);
});


module.exports = router;
