'use strict';
var meetingPlacesApp = angular.module('meetingPlaces');

meetingPlacesApp.controller('meetingPlacesControllerMain', ['$scope' ,'appUserService', '$http', '$routeParams','$location', 'growl','$rootScope',
  function($scope ,appUserService, $http, $routeParams, $location,growl,$rootScope) {
    
    appUserService.activeUser().then(function(user){
    //console.log("thsis"+user._id);
    $scope.activeUser = user;

    $scope.hideFilter = true;
    $scope.hideAddRow = true;
    $scope.action = "none";

    $scope.groupMember = $scope.activeUser.groups;
    if ($scope.activeUser.groups.includes("admin") === true ) {
      $scope.visitGrid= false; 
    }
    else if ($scope.activeUser.groups.includes("vManager") === true) {
      $scope.visitGrid= true; 
    }
    
  // if ($rootScope.user.groups.indexOf("vManager") > -1) {
  //   $scope.visitGrid= true;
  // }
    //fetching all the meetingPlaces details by calling refresh function
    var refresh = function() {
       //Location - Http get for drop-down
       $http.get('/api/v1/secure/lov/locations').success(function(response) {
        $scope.location=response.values;
      });

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

});

}]);