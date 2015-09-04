app.config(function($stateProvider){
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'js/states/signup/signup.state.html',
    controller: 'SignupController'
  })
})
