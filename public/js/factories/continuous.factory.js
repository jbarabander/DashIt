app.factory('ContinuousDash', function(DS) {
  var ContinuousDash = DS.defineResource({
    name: 'continuous',
    url: '/api/dashes/',
    idAttribute: '_id',
  });
  return ContinuousDash;
}).run(function(ContinuousDash){});
