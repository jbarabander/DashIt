'use strict';

var app = angular.module('DashIt', ['js-data', 'ui.router'])
  .config(function(DSProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');


    DSProvider.defaults.basePath = '/api';
    DSProvider.defaults.idAttribute = '_id';
    /*
    a method to the DSProvider defaults object that automatically
    checks if there is any data in the cache for a given service before
    pinging the database
    */
    DSProvider.defaults.getOrFind = function(service){
      var data = this.getAll();
      if (data.length) return Promise.resolve(angular.copy(data));
      else {
        return this.findAll().then(function(data){
          return angular.copy(data);
        });
      }
    };

    /*
    removes the relations from an object before the request is sent to the DB
    (this is hard!)
    */
    // DSProvider.defaults.serialize = function (resource, data) {
    //   if (resource.relationFields && resource.relationFields.length){
    //     data = angular.copy(data);
    //     resource.relationFields.forEach(function(relation){
    //       if(data[relation] && typeof data[relation] === 'object') data[relation] = data[relation]._id
    //     })
    //   }
    // }

  })
  .config(function(DSProvider) {
    // Mongoose Relation Fix (fixes deserialization)
    // From http://plnkr.co/edit/3z90PD9wwwhWdnVrZqkB?p=preview
    // This was shown to us by @jmdobry, the idea here is that
    // we fix the data coming from Mongoose models in js-data rather than outbound from Mongoose
    function fixRelations(Resource, instance) {
      function fixLocalKeys(i) {
        JSData.DSUtils.forEach(Resource.relationList, function(def) {
          var relationName = def.relation;
          var relationDef = Resource.getResource(relationName);
          if (def.type === 'hasMany') {
            if (i.hasOwnProperty(def.localField)) {
              if (i[def.localField].length && !JSData.DSUtils.isObject(i[def.localField][0])) {
                // Case 1: array of _ids where array of populated objects should be
                i[def.localKeys] = i[def.localField];
                delete i[def.localField];
              } else if (!i[def.localKeys]) {
                // Case 2: array of populated objects, but missing array of _ids'
                i[def.localKeys] = [];
                JSData.DSUtils.forEach(i[def.localField], function(child) {
                  i[def.localKeys].push(child[relationDef.idAttribute]);
                });
              }
            }
          }
          else if (def.type === 'belongsTo') {
            if (i.hasOwnProperty(def.localField)) {
              // if the localfIeld is a popualted object
              if (JSData.DSUtils.isObject(i[def.localField])) {
                i[def.localKey] = i[def.localField]._id;
              }
              // if the localfield is an object id
              else if (!JSData.DSUtils.isObject(i[def.localField])) {
                i[def.localKey] = i[def.localField];
                delete i[def.localField];
              }
            }
          }
        });
      }

      if (JSData.DSUtils.isArray(instance)) {
        JSData.DSUtils.forEach(instance, fixLocalKeys);
      } else {
        fixLocalKeys(instance);
      }
    }


    DSProvider.defaults.deserialize = function(Resource, data) {
      var instance = data.data;
      fixRelations(Resource, instance);
      return instance;
    };
    // End Mongoose Relation fix
  });

  app.run(function(Auth, $rootScope) {
    Auth.refreshMe().then(function(element) {
      console.log('in the refresh ', $rootScope.isLoggedIn());
    });
  });

app.controller('LoginController', function($scope, Auth, $state) {
  $scope.loginCreds = {username: null, password: null};
  $scope.login = function(loginObj) {
    Auth.login(loginObj).then(function(element) {
      $state.go('home');
      // $state.go('profile', {id: element._id});
    });
  };
});

app.controller('NavBarController', function($scope, $state, $location, $rootScope, Auth) {
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
  // $scope.userSearch = function(searchString) {
  //   //console.log(searchString);
  //   $state.go('searchResults', {username: searchString});
  // };
});

app.controller('SearchController', function($scope, user) {
  $scope.user = user;
});

app.controller('SearchController', function($scope, users) {
  console.log(users);
  $scope.users = users;
});

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

app.controller('UserController', function($scope, user) {
    console.log(user);
    $scope.user = user;
})

app.factory('Auth', function($http, $rootScope) {
  var me;
  //copy of me currentUserFactory
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

app.factory('ContinuousDash', function(DS) {
  var ContinuousDash = DS.defineResource({
    name: 'continuous',
    basePath: '/dashes/',
    idAttribute: '_id',
    relations: {
      hasMany: {
        blips: {
          localField: 'blips',
          foreignKey: 'continuousDashId'
        }
      }
    }
  });
  return ContinuousDash;
}).run(function(ContinuousDash){});

app.factory('DiscreteDash', function(DS) {
  var DiscreteDash = DS.defineResource({
    name: 'discrete',
    basePath: '/dashes/',
    idAttribute: '_id',
    relations: {
      hasMany: {
        steps: {
          localField: 'steps',
          foreignKey: 'discreteDashId'
        }
      }
    }
  });
  return DiscreteDash;
}).run(function(DiscreteDash){});

app.factory('Blip', function(DS) {
  var Blip = DS.defineResource({
    name: 'blips',
    idAttribute: '_id',
    relations: {
      belongsTo: {
        continuous: {
          localField: 'history',
          localKey: 'continuousDashId'
        }
      }
    }
  });
  return Blip;
}).run(function(Blip){});

app.factory('Step', function(DS) {
  var Step = DS.defineResource({
    name: 'steps',
    idAttribute: '_id',
    relations: {
      belongsTo: {
        discrete: {
          localField: 'discreteDash',
          localKey: 'discreteDashId'
        }
      }
    }
  });
  return Step;
}).run(function(Step){});

app.factory('User', function(DS) {
  var User = DS.defineResource({
    name: 'users',
    idAttribute: '_id',
    relations: {
      hasMany: {
        discrete: {
          localField: 'discreteDashes',
          foreignKey: 'userId'
        },
        continuous: {
          localField: 'continuousDashes',
          foreignKey: 'userId'
        }
      }
    }
  });
  return User;
}).run(function(User){});

app.directive('login', function(Auth){
  return {
    restrict: 'E',
    templateUrl: 'assets/js/directives/login/login.html',
    scope: {
      creds: '=',
      login: '&'
    },
  };
});

app.directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'assets/js/directives/navbar/navbar.html',
    controller: 'NavBarController',
  };
});

app.directive('register', function(Auth){
  return {
    restrict: 'E',
    templateUrl: 'assets/js/directives/register/register.html',
    scope: {
      newUser: '=',
      signup: '&'
    },
  };
});

app.directive('responsiveBg', function(Auth){
  return {
    restrict: 'A',
    scope: {
      bgImage: '='
    },
    link: function(scope, element, attr) {
      element.css('background-image', 'url(' + scope.bgImage + ')');
    },
  };
});

app.config(function($stateProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'assets/js/states/home/home.state.html',
  });
});

app.config(function($stateProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'assets/js/states/login/login.state.html',
    controller: 'LoginController'
  })
})

app.config(function($stateProvider) {
  $stateProvider
  .state('profile', {
    url: '/users/:id',
    templateUrl: 'assets/js/states/profile/profile.state.html',
    controller: 'UserController',
    resolve: {
      user: function(User, $stateParams) {
        return User.find($stateParams.id)
        .then(function(user) {
          return user;
        });
      }
    }
  });
});

app.config(function($stateProvider) {
  $stateProvider
  .state('searchResults', {
    url: '/users/search/?username',
    templateUrl: 'assets/js/states/search/search.state.html',
    controller: 'SearchController',
    resolve: {
      users: function(User, $http, $stateParams) {
        return User.findAll({username: $stateParams.username})
        .then(function(users) {
          return users;
        });
        // return $http.get('api/users', {params: {username: $stateParams.username}})
        // .then(function(users) {
        //   return users.data;
        // })
      }
    }
  });
});

app.config(function($stateProvider){
  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'assets/js/states/signup/signup.state.html',
    controller: 'SignupController'
  })
})
