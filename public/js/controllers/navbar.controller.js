app.controller('NavBarController', function($scope, $state, $location, Auth) {
  $scope.pathStartsWith = function(state) {
    var partial = $state.href(state);
    var path = $location.path();
    return path.startsWith(partial);
  };
  $scope.logout = function() {
    Auth.logout().then(function(element) {
      $state.go('home');
    });
  };
  $scope.userSearch = function(searchString) {
    console.log(searchString);
    $state.go('searchResults', {username: searchString});
  }
});
