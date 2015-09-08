app.factory('Auth', function($http, $rootScope, User) {
  $rootScope.me = {};//FIXME

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
    return $http.delete('auth/logout').then(function(response) {
      return response.data;
    });
  }

  function refreshMe() {
    return $http.get('auth/me').then(function(response) {
      User.find()
    });
  }

  return {
    login: login,
    createUser: createUser,
    logout: logout
  };
});
//FIXME
