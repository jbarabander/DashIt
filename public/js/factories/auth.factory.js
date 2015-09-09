app.factory('Auth', function($http, $rootScope) {
  var me;
  $rootScope.isLoggedIn = function () {
		return !!me._id;
	};
  $rootScope.isMe = function(user) {
    return !!user && (me._id === user._id);
  };
  $rootScope.isAdmin = function() {
    return !!me.isAdmin;
  };
  $rootScope.getUserName = function() {
    return me.username;
  };
  $rootScope.getEmail = function() {
    return me.email;
  };
  $rootScope.getFirstName = function() {
    return me.firstName;
  };
  $rootScope.getLastName = function() {
    return me.lastName;
  };

  $rootScope.getId = function() {
    return me._id;
  }

  function login(loginObj) {
    return $http.post('auth/login', loginObj).then(function(response) {
      refreshMe();
      return response.data;
    });
  }
  function createUser(registerObj) {
    return $http.post('auth/register', registerObj).then(function(response) {
      refreshMe();
      return response.data;
    });
  }
  function logout() {
    return $http.delete('auth/me').then(function(response) {
      me = {};
    });
  }

  function refreshMe() {
    return $http.get('auth/me').then(function(response) {
      me = response.data;
    });
  }

  return {
    login: login,
    createUser: createUser,
    logout: logout,
    refreshMe: refreshMe,
  };
});
//FIXME
