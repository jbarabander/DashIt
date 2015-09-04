app.controller('LoginController', function($scope, Auth, $state) {
  $scope.loginCreds = {username: null, password: null};
  $scope.createAccount = false;
  $scope.login = function(loginObj) {
    Auth.login(loginObj).then(function(element) {
      $state.go('user', {id: element._id});
    });
  };
});
