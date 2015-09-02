app.factory('Step', function(DS) {
  var Step = DS.defineResource({
    name: 'steps',
    idAttribute: '_id',
    relations: {
      belongsTo: {
        discrete: {
          localField: 'discreteDash',
          localKey: 'discreteDashId'
        }
      }
    }
  });
  return Step;
}).run(function(Step){});
