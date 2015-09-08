var router = require('express').Router(),
	session = require('express-session'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser');

var User = require('../models/user.js');

router.use(session({
  secret: 'Darkstalker', //FIXME move to secrets file later
  resave: false,
  saveUninitialized: false
}));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, done);
});

router.use(passport.initialize());
router.use(passport.session());

module.exports = router;
