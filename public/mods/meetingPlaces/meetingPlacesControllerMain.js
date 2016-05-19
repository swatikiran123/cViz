'use strict';
var meetingPlacesApp = angular.module('meetingPlaces');

meetingPlacesApp.controller('meetingPlacesControllerMain', ['$scope', '$http', '$routeParams','$location', 'growl','$rootScope',
  function($scope, $http, $routeParams, $location,growl,$rootScope) {

    $scope.hideFilter = true;
    $scope.hideAddRow = true;
    $scope.action = "none";
  if ($rootScope.user.groups.indexOf("vManager") > -1 || $rootScope.user.groups.indexOf("admin") > -1) {
    $scope.visitGrid= true;
  }
    //fetching all the meetingPlaces details by calling refresh function
    var refresh = function() {
      $http.get('/api/v1/secure/meetingPlaces').success(function(response) {
        $scope.meetingPlaceslist = response;
        $scope.meetingPlaces = "";
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
        $scope.addmeetingPlaces();
        break;

        case "edit":
        $scope.update();
        break;
      }
    }

    //adding new meetingPlaces into the meetingPlaces model
    $scope.addmeetingPlaces = function() {
      console.log($scope.meetingPlaces);
      $http.post('/api/v1/secure/meetingPlaces', $scope.meetingPlaces).success(function(response) {
        refresh();
        $scope.hideAddRow = true;
        growl.info(parse("Meeting Place for location [%s]<br/>added successfully",$scope.meetingPlaces.location));
      });
    };

    //removing the meetingPlaces from meetingPlaces model
    $scope.remove = function(meetingPlaces) {
     $http.delete('/api/v1/secure/meetingPlaces/' + meetingPlaces._id).success(function(response) {
      refresh();
      growl.info(parse("Meeting Place for location [%s]<br/>deleted successfully",meetingPlaces.location));
    });
   };

   //editing the existing meetingPlaces details
   $scope.edit = function(id) {
    $http.get('/api/v1/secure/meetingPlaces/' + id).success(function(response) {
      $scope.meetingPlaces = response;
      $scope.hideAddRow = false;
      $scope.action = "edit";
    });
  };

  //updating meetingPlaces details
  $scope.update = function() {
    $http.put('/api/v1/secure/meetingPlaces/' + $scope.meetingPlaces._id, $scope.meetingPlaces).success(function(response) {
      refresh();
      $scope.action = "none";
      $scope.hideAddRow = true;
      growl.info(parse("Meeting Place for location [%s]<br/>updated successfully",$scope.meetingPlaces.location));
    })
  };

  //closing the record by clicking on close button
  $scope.deselect = function() {
    $scope.meetingPlaces = "";
    $scope.hideAddRow = true;
  }

  $scope.relocation = function(locat){
    $http.get('/api/v1/secure/meetingPlaces/city/' + $scope.locat).success(function(response) {
      console.log("im here");
      console.log(response);
      $scope.detailDisplay = response;
     //console.log($scope.detailDisplay);
     $location.url("/city/");
    });
    
  }


}]);