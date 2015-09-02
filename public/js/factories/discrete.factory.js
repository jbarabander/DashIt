app.factory('DiscreteDash', function(DS) {
  var DiscreteDash = DS.defineResource({
    name: 'discrete',
    url: '/api/dashes/',
    idAttribute: '_id',
    relations: {
      hasMany: {
        steps: {
          localField: 'steps',
          foreignKey: 'discreteDashId'
        }
      }
    }
  });
  return DiscreteDash;
}).run(function(DiscreteDash){});
