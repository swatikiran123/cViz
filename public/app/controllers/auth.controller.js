myApp.controller('LoginCtrl', ['$scope', '$window', '$location', 'UserAuthFactory', 'AuthenticationFactory',
  function($scope, $window, $location, UserAuthFactory, AuthenticationFactory) {
    $scope.user = {
      username: 'svema@myApp.com',
      password: 'pass123'
    };
 
    $scope.login = function() {
 
      var username = $scope.user.username,
        password = $scope.user.password;
 
      if (username !== undefined && password !== undefined) {
        
        var promise = UserAuthFactory.login(username, password);
        promise.then(function(data) {
       
          AuthenticationFactory.isLogged = true;
          AuthenticationFactory.user = data.user.username;
          AuthenticationFactory.userRole = data.user.role;
 
          $window.sessionStorage.token = data.token;
          $window.sessionStorage.user = data.user.username; // to fetch the user details on refresh
          $window.sessionStorage.userRole = data.user.role; // to fetch the user details on refresh
 
          $location.path("/");
 
        }
        , function(reson){
          alert('Oops something went wrong!');
        }); // end of promise
        
      } else {
        alert('Invalid credentials');
      } // end of if username
 
    }; // end of login function
 
  }
]);