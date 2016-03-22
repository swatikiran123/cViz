'use strict';
var contactListApp = angular.module('contactList');

contactListApp.controller('contactListControllerMain', ['$scope', '$http', '$routeParams','$location', 'growl','$rootScope',
  function($scope, $http, $routeParams, $location,growl,$rootScope) {

    $scope.hideFilter = true;
    $scope.hideAddRow = true;
    $scope.action = "none";
    $scope.contactId = "";
    $scope.contactEmail = "";
    $scope.contactUser =  "";
    $scope.small= "small";
    $scope.large= "LARGE";
    $scope.medium= "medium";
    $scope.nameonly= "nameonly";

 //Location - Http get for drop-down
 $http.get('/api/v1/secure/lov/locations').success(function(response) {
  $scope.location=response.values;
});

  //contactType - Http get for drop-down
  $http.get('/api/v1/secure/lov/contactType').success(function(response) {
    $scope.type=response.values;
  });


    //fetching all the contactList details by calling refresh function
    var refresh = function() {
      $http.get('/api/v1/secure/contactList').success(function(response) {
        $scope.contactListlist = response;
        $scope.contactList = "";
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
        $scope.addcontactList();
        break;

        case "edit":
        $scope.update();
        break;
      }
    }

    //adding new contactList into the contactList model
    $scope.addcontactList = function() {
      $scope.contactList.user = $scope.contactId;
      console.log("somthing" + $scope.contactList);
      $http.post('/api/v1/secure/contactList', $scope.contactList).success(function(response) {
        refresh();
        $scope.hideAddRow = true;
        growl.info(parse("contactList with type [%s]<br/>added successfully",$scope.contactList.type));
      });
    };

    //removing the contactList from contactList model
    $scope.remove = function(contactList) {
     $http.delete('/api/v1/secure/contactList/' + contactList._id).success(function(response) {
      refresh();
      growl.info(parse("contactList with user [%s]<br/>deleted successfully",user));
    });
   };

   //editing the existing contactList details
   $scope.edit = function(id) {
    $http.get('/api/v1/secure/contactList/' + id).success(function(response) {
      $scope.contactList = response;
      $scope.contactUser = response.user;
      $scope.contactEmail = response.user.email;
      $scope.contactId = response.user._id;
      $scope.hideAddRow = false;
      $scope.action = "edit";
    });
  };

  //updating contactList details
  $scope.update = function() {
    $scope.contactList.user = $scope.contactId;
    $http.put('/api/v1/secure/contactList/' + $scope.contactList._id, $scope.contactList).success(function(response) {
      refresh();
      $scope.contactUser="";
      $scope.contactEmail="";
      $scope.contactId="";
      $scope.action = "none";
      $scope.hideAddRow = true;
    })
  };

  //closing the record by clicking on close button
  $scope.deselect = function() {
    $scope.contactList = "";
    $scope.hideAddRow = true;
  }

  $scope.relocation = function(locat){
    $http.get('/api/v1/secure/contactList/city/' + $scope.locat).success(function(response) {
      console.log("im here");
      console.log(response);
      $scope.detailDisplay = response;
     //console.log($scope.detailDisplay);
     $location.url("/city/");
    });
    
  }


}]);