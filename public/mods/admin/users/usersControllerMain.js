'use strict';
var usersApp = angular.module('users');

usersApp.controller('usersControllerMain', ['$scope', '$http', '$routeParams','$location', 'growl','$rootScope',
  function($scope, $http, $routeParams, $location,growl,$rootScope) { 
    $scope.hideFilter = true;
    $scope.hideAddRow = true;
    $scope.action = "none";

    //fetching all the user details by calling refresh function
    var refresh = function() {
      $http.get('/api/v1/secure/admin/users').success(function(response) {       
        $scope.userlist = response;
        $scope.user = "";
      });
    };

    refresh();

    //method for adding new record dynamically
    $scope.addRecord = function(){
      $scope.hideAddRow = false;
      $scope.action = "add";
    };

    $scope.save = function() {
      switch($scope.action)
      {
        case "add":
          $scope.addUser();
          break;

        case "edit":
          $scope.update();
          break;
      }
    }

    //adding new user into the user model
    $scope.addUser = function() {      
      $http.post('/api/v1/secure/admin/users/', $scope.user).success(function(response) {        
        refresh();
        $scope.action = "none";
        $scope.hideAddRow = true;
        growl.info(parse("User with email [%s]<br/>added successfully",$scope.user.email));
      });
    };

    //removing the user from user model
    $scope.remove = function(user) {
       var email = user.email;
       $http.delete('/api/v1/secure/admin/users/' + user._id).success(function(response) {
        refresh();
        growl.info(parse("User with email [%s]<br/>deleted successfully",email));
      });
    };

    //editing the existing user details
    $scope.edit = function(id) {      
      $http.get('/api/v1/secure/admin/users/' + id).success(function(response) {
        $scope.user = response;
        $scope.hideAddRow = false;
        $scope.action = "edit";
      });
    }; 

    //updating user details
    $scope.update = function() {      
      $http.put('/api/v1/secure/admin/users/' + $scope.user._id, $scope.user).success(function(response) {
        refresh();
        $scope.action = "none";
        $scope.hideAddRow = true;
      })
    };

    //closing the record by clicking on close button
    $scope.deselect = function() {
      $scope.user = "";
      $scope.hideAddRow = true;
    }
    
   //lock the existing user whose status is active  
   $scope.lock = function(id,user) {
      user.status = "Locked" ;
      $http.put('/api/v1/secure/admin/users/' + id,user).success(function(response) {
        refresh();
        growl.info(parse("User with email [%s]<br/>locked successfully",user.email));        
      })
    };

    //unlock the existing user whose status is locked  
    $scope.unlock = function(id,user) {
      user.status = "Active" ;
      $http.put('/api/v1/secure/admin/users/' + id, user).success(function(response) {
        refresh();       
        growl.info(parse("User with email [%s]<br/>unlocked successfully",user.email));
      })
    };

  }]);
