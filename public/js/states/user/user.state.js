app.config(function($stateProvider) {
  $stateProvider
  .state('user', {
    url: '/users/:id',
    templateUrl: '/js/states/user/user.state.html',
    controller: 'UserController',
  });
});
