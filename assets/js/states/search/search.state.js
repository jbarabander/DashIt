app.config(function($stateProvider) {
  $stateProvider
  .state('searchResults', {
    url: '/users/search/?username',
    templateUrl: '/js/states/search/search.state.html',
    controller: 'SearchController',
    resolve: {
      users: function(User, $http, $stateParams) {
        return User.findAll({username: $stateParams.username})
        .then(function(users) {
          return users;
        });
        // return $http.get('api/users', {params: {username: $stateParams.username}})
        // .then(function(users) {
        //   return users.data;
        // })
      }
    }
  });
});
