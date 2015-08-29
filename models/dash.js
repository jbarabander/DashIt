var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var Promise = require('bluebird');
require('./');
var Step = require('./step.js');

var dashSchema = mongoose.Schema (
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    startDate: {type: Date, default: Date.now},
    endDate: {type: Date, min: Date.now}
  },
  {collection: 'dashes', discriminatorKey: '_type'}
);

var discreteDashSchema = dashSchema.extend(
  {
    steps: [Step.schema]
  }
);

var continuousDashSchema = dashSchema.extend(
  {
    source: {type: String},
    current: {type: Number, required: true},
    target: {type: Number, required: true}
  }
);

module.exports = {
  Discrete: mongoose.model('Discrete', discreteDashSchema),
  Continuous: mongoose.model('Continuous', continuousDashSchema)
};
