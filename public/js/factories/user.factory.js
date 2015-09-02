app.factory('User', function(DS) {
  var User = DS.defineResource({
    name: 'users',
    idAttribute: '_id',
    relations: {
      hasMany: {
        discrete:   {
          localField: 'discreteDashes',
          foreignKey: 'userId'
        },
        continuous: {
          localField: 'continuousDashes',
          foreignKey: 'userId'
        }
      }
    }
  });
  return User;
}).run(function(User){});
