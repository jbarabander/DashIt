app.factory('Blip', function(DS) {
  var Blip = DS.defineResource({
    name: 'blips',
    idAttribute: '_id',
    relations: {
      belongsTo: {
        continuous: {
          localField: 'history',
          localKey: 'continuousDashId'
        }
      }
    }
  });
  return Blip;
}).run(function(Blip){});
