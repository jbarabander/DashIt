app.controller('NavBarController', function($scope) {
  $scope.selectActive = function(navElement) {
    $scope.activeNav = navElement;
  };
  $scope.isActive = function(navElement) {
    return $scope.activeNav === navElement;
  }
});
