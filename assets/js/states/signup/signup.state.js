app.config(function($stateProvider){
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'assets/js/states/signup/signup.state.html',
    controller: 'SignupController'
  })
})
