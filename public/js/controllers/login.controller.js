app.controller('LoginController', function($scope, Auth, $state) {
  $scope.loginCreds = {username: null, password: null};
  $scope.login = function(loginObj) {
    Auth.login(loginObj).then(function(element) {
      $state.go('home');
      // $state.go('profile', {id: element._id});
    });
  };
});
