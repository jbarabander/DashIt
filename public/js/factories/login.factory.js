app.factory('LoginFactory', function($http) {
  function loginChecker(loginObj) {
    return $http.get('users/login', {params: loginObj}).then(function(response) {
      return response.data;
    });
  }
  function createLogin(loginObj) {
    return $http.post('users/register', loginObj).then(function(response) {
      return response.data;
    })
  }

  return {
    loginChecker: loginChecker,
    createLogin: createLogin
  };
});
//FIXME
