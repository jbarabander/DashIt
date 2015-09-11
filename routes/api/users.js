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

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id)
      .then(function(element) {
        res.json(element);
      })
})

module.exports = router;
