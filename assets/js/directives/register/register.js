app.directive('register', function(Auth){
  return {
    restrict: 'E',
    templateUrl: 'assets/js/directives/register/register.html',
    scope: {
      newUser: '=',
      signup: '&'
    },
  };
});
