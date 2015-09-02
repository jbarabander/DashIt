app.controller('LoginController', function($scope, LoginFactory) {
  $scope.login = {username: null, password: null};
  $scope.createAccount = false;
  $scope.getLogin = function() {
    LoginFactory.loginChecker(loginObj).then(function(element) {
    });
  };
  $scope.createLogin = function () {}
});
