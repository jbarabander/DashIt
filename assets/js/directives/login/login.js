app.directive('login', function(Auth){
  return {
    restrict: 'E',
    templateUrl: 'assets/js/directives/login/login.html',
    scope: {
      creds: '=',
      login: '&'
    },
  };
});
