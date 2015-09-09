app.controller('NavBarController', function($scope, $state, Auth) {
  $scope.selectActive = function(navElement) {
    $scope.activeNav = navElement;
  };
  $scope.isActive = function(navElement) {
    return $scope.activeNav === navElement;
  };
  $scope.logout = function() {
    Auth.logout().then(function(element) {
      $state.go('home');
    });
  };
});
