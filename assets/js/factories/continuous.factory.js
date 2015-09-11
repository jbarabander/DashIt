app.factory('ContinuousDash', function(DS) {
  var ContinuousDash = DS.defineResource({
    name: 'continuous',
    basePath: '/dashes/',
    idAttribute: '_id',
    relations: {
      hasMany: {
        blips: {
          localField: 'blips',
          foreignKey: 'continuousDashId'
        }
      }
    }
  });
  return ContinuousDash;
}).run(function(ContinuousDash){});
