var mongoose = require('mongoose');
var Promise = require('bluebird');
require('./');
var limitText = require('../utilities/modelUtilities.js').limitText;

var blipSchema = mongoose.Schema(
  {
    value: {type: String, required: true},
    description: {type: String},
    date: {type: Date, required: true, default: Date.now()}
  }
);

module.exports = mongoose.model('Blip', blipSchema);
