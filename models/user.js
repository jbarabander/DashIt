var mongoose = require('mongoose');
var Promise = require('bluebird');
require('./');

var discreteDash = require('./dash.js').Discrete;
var continuousDash = require('./dash.js').Continuous;

var bcrypt = Promise.promisifyAll(require('bcrypt'));

var userSchema = mongoose.Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true, select: false},
    pictureUrl: {type: String, default: "../images/default-img.png"},
    headerPictureUrl: {type: String, default: "../images/20150505_083625_resized.jpg"},
    email: {type: String, required: true, unique: true},
    discreteDashes: [{type: mongoose.Schema.Types.ObjectId, ref: 'DiscreteDash'}],
    continuousDashes: [{type: mongoose.Schema.Types.ObjectId, ref: 'ContinuousDash'}],
    isAdmin: {type: Boolean, default: false}
  }
);

userSchema.methods.hash = function(pass, cb) {
  var self = this;
  return bcrypt.genSalt(12, function(err, salt) {
    if(err) return cb(err);
    bcrypt.hash(pass, salt, function(err, hash) {
      if(err) return cb(err);
      self.passwordHash = hash;
      return cb();
    })
  });
};

// userSchema.path('passwordHash').set(function(plaintext) {
//   return this.hash(plaintext);
// });

userSchema.pre('save', function(next) {
  if(!this.isNew) return next();
  this.hash(this.passwordHash, next);
});

userSchema.methods.authenticate = function(pass, cb) {
  return bcrypt.compare(pass, this.passwordHash, function(err, res) {
    if(err) return cb(err);
    return cb(null, res);
  });
};

module.exports = mongoose.model('User', userSchema);
