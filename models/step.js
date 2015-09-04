var mongoose = require('mongoose');
var Promise = require('bluebird');
require('./');
var limitText = require('../utilities/modelUtilities.js').limitText;

var stepSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String},
    status: {
      completed: {type: Boolean, required: true, default: false},
      when: {type: Date, min: Date.now}
    },
    date: {type: Date, required: true}
  }
);

stepSchema.path('title').validate(function(value) {
  return limitText(value, 50);
});

stepSchema.path('description').validate(function(value) {
  return limitText(value, 300);
});

module.exports = mongoose.model('Step', stepSchema);
