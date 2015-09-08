app.factory('Auth', function($http, $rootScope) {

  function login(loginObj) {
    return $http.post('auth/login', loginObj).then(function(response) {
      return response.data;
    });
  }
  function createUser(registerObj) {
    return $http.post('auth/register', registerObj).then(function(response) {
      return response.data;
    });
  }
  function logout() {
    return $http.delete('auth/me').then(function(response) {
      delete $rootScope.me;
    });
  }

  function refreshMe() {
    return $http.get('auth/me').then(function(response) {
      console.log(response);
      $rootScope.me = response.data;
    });
  }

  return {
    login: login,
    createUser: createUser,
    logout: logout,
    refreshMe: refreshMe
  };
});
//FIXME
