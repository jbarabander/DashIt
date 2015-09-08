var express = require('express');
var router = express.Router();
var User = require('../models/user.js');

router.post('/login', function(req, res, next) {
  console.log('in login route');
  var username = req.body.username;
  var password = req.body.password;
  var query = User.findOne({username: username}).select('+passwordHash');
  query.exec(function(err, user) {
    if(err) return next(err);
    user.authenticate(password, function(err, result) {
      if(err) return next(err);
      if(res) return req.login(user, function() {
        res.json(user);
      });
      return res.sendStatus(403);
    });
  });
});

router.post('/register', function(req, res, next) {
  User.create(req.body, function(err, user) {
    console.log(err);
    if(err) return next(err);
    req.login(user, function() {
      res.json(user);
    });
  });
});

module.exports = router;
