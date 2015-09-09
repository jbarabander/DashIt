var express = require('express');
var router = express.Router();
var User = require('../../models/user.js');

router.get('/', function(req, res, next) {
  var username = req.query.username;
  User.find({username: username})
  .then(function(elements) {
    console.log(elements);
    res.json(elements);
  });
});

module.exports = router;
