var router = require('express').Router();
var sass = require('node-sass-middleware');
var path = require('path');

router.use(sass(
  {
    src: path.join(__dirname, '..', '/assets'),
    dest: path.join(__dirname, '..', '/public'),
    debug: true,
    outputStyle: 'compressed'
  }
));

module.exports = router;
