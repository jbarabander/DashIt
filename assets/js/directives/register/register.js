app.directive('register', function(Auth){
  return {
    restrict: 'E',
    templateUrl: '/js/directives/register/register.html',
    scope: {
      newUser: '=',
      signup: '&'
    },
  };
});
