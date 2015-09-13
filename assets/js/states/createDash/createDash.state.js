app.config(function($stateProvider) {
  $stateProvider
  .state('dashCreate', {
    url: '/user/:id/dash',
    templateUrl: 'assets/js/states/createDash/createDash.state.html',
    controller: 'CreateDashController'
  })
  .state('dashCreate.discrete', {
    url: '/discrete',
    templateUrl: 'assets/js/states/createDash/createDiscrete.state.html',
    controller: 'CreateDiscreteController'
  })
  .state('dashCreate.continuous', {
    url: '/continuous',
    templateUrl: 'assets/js/states/createDash/createContinuous.state.html',
    controller: 'CreateContinuousController'
  })
});
