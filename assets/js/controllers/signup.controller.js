app.controller('SignupController', function($scope, Auth, $state) {
  $scope.newUser = {
    firstName: null,
    lastName: null,
    username: null,
    passwordHash: null,
    email: null,
  };
  $scope.signUp = function(newUserObj) {
    Auth.createUser(newUserObj).then(function(user) {
      $state.go('home');
      // $state.go('user', {id: user._id});
    });
  };
});
