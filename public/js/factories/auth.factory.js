app.factory('Auth', function($http) {
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
  function logOut() {
    return $http.delete('auth/logout').then(function(response) {
      return response.data;
    })
  }

  return {
    login: login,
    createUser: createUser
  };
});
//FIXME
