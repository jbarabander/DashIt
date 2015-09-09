app.config(function($stateProvider) {
  $stateProvider
  .state('profile', {
    url: '/users/:id',
    templateUrl: '/js/states/user/user.state.html',
    controller: 'UserController',
    resolve: {
      user: function(User, $stateParams) {
        return User.find($stateParams.id)
        .then(function(user) {
          return user;
        });
      }
    }
  });
});
