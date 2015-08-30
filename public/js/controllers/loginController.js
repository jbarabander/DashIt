app.controller('loginController', function($scope) {
  $scope.createAccount = false;
  $scope.toggleTF = function() {
    $scope.createAccount = !$scope.createAccount;
  };
});
