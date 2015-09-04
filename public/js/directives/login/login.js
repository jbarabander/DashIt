app.directive('login', function(Auth){
  return {
    restrict: 'E',
    templateUrl: '/js/directives/login/login.html',
    scope: {
      creds: '=',
      login: '&'
    },
  };
});
