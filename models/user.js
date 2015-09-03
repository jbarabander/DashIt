var mongoose = require('mongoose');
var Promise = require('bluebird');
require('./');

var discreteDash = require('./dash.js').Discrete;
var continuousDash = require('./dash.js').Continuous;


var userSchema = mongoose.Schema(
  {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    pictureUrl: String,
    email: {type: String, required: true, unique: true},
    discreteDashes: [{type: mongoose.Schema.Types.ObjectId, ref: 'DiscreteDash'}],
    continuousDashes: [{type: mongoose.Schema.Types.ObjectId, ref: 'ContinuousDash'}]
  }
);

module.exports = mongoose.model('User', userSchema);
