myApp.factory('AuthenticationFactory', function($window, $http, $q, ApiDiscoveryService) {
  var auth = {
    isLogged: false,
    check: function() {
      var deferred = $q.defer();
      console.log("AuthFactory->check called");
      if ($window.sessionStorage.token && $window.sessionStorage.user) {
        this.isLogged = true;
      } else {
        // Check if server side login complete
        var promise = ApiDiscoveryService.getEndPoint('token');
        promise.then(function(apiEndPoint){
          $http.get(apiEndPoint).success(function(data, status, headers){
            console.log('AuthFactory->check:isLogged:: ' + data);
            this.isLogged = true;
          }).error(function(data, status, headers){

            console.log('AuthFactory->check:isLogged:: error with status code::' + status);
            this.isLogged = false;
            delete this.user;

            if(status==404){
              // /token not found, login required
              $window.location.href = "/login";
            }
          }); // end of http.get
        }); // end of promise
/*        this.isLogged = false;
        delete this.user;*/
      }
      return deferred.promise;
    }
  }
 
  return auth;
});
 
myApp.factory('UserAuthFactory', function($window, $location, $http, $q, AuthenticationFactory, ApiDiscoveryService) {
  return {
    login: function(username, password) {
      
      var deferred = $q.defer();
      var apiEndPoint = {};
      var promise = ApiDiscoveryService.getEndPoint('login');
      promise.then(function(endPoint) {
        console.log('api endppoint retrived: ' + JSON.stringify(endPoint));
        
        apiEndPoint = endPoint;
        console.log('end point found: ' + apiEndPoint)
        console.log('calling with ' + apiEndPoint);
              
        $http.post(apiEndPoint, {
          username: username,
          password: password
        })
        .success(function(data, status, headers, config){
          console.log('login successful');
          deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
          console.log('api discovery error');
          deferred.reject(status);
        }); // end of http.post apiEndPoint

      }, function(reason) {
        console.log('failed')
        deferred.reject();
      }); // end of promise

      return deferred.promise;
    },
    logout: function() {
 
      if (AuthenticationFactory.isLogged) {
 
        AuthenticationFactory.isLogged = false;
        delete AuthenticationFactory.user;
        delete AuthenticationFactory.userRole;
 
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.user;
        delete $window.sessionStorage.userRole;
 
        $location.path("/login");
      }
 
    }
  }
});
 
myApp.factory('TokenInterceptor', function($q, $window) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers['X-Access-Token'] = $window.sessionStorage.token;
        config.headers['X-Key'] = $window.sessionStorage.user;
        config.headers['Content-Type'] = "application/json";
      }
      return config || $q.when(config);
    },
 
    response: function(response) {
      return response || $q.when(response);
    }
  };
});