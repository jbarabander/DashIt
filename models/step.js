var mongoose = require('mongoose');
var Promise = require('bluebird');
require('./');

var stepSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false},
    date: {type: Date, required: true}
  }
);

module.exports = mongoose.Model('Step', stepSchema);
