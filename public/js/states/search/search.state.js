app.config(function($stateProvider) {
  $stateProvider
  .state('user', {
    url: '/users/search/:searchQuery',
    templateUrl: '/js/states/search/search.state.html',
    controller: 'SearchController',
    resolve: {
      users: function(User, $stateParams) {
        return User.findAll($stateParams.searchQuery)
        .then(function(users) {
          return users;
        }); //FIXME
      }
    }
  });
});
