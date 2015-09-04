app.config(function($stateProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'js/states/login/login.state.html',
    controller: 'LoginController'
  })
})
