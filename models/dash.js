var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Promise = require('bluebird');
require('./');
var Step = require('./step.js');
var limitText = require('../utilties/modelUtilities.js').limitText;

var dashSchema = mongoose.Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, min: Date.now}
  },
  {collection: 'dashes', discriminatorKey: '_type'}
);

dashSchema.path('title').validate(function(value) {

});


var discreteDashSchema = dashSchema.extend(
  {
    steps: [Step.schema]
  }
);

var continuousDashSchema = dashSchema.extend(
  {
    source: {type: String},
    current: {type: Number, required: true},
    target: {type: Number, required: true},
  }
);

module.exports = {
  Discrete: mongoose.model('DiscreteDash', discreteDashSchema),
  Continuous: mongoose.model('ContinuousDash', continuousDashSchema)
};
