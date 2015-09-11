app.directive('register', function(Auth){
  return {
    restrict: 'E',
    templateUrl: '/js/directives/signup/signup.html',
    scope: {
      newUser: '=',
      signup: '&'
    },
  };
});
