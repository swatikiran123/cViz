'use strict';

var teasersApp = angular.module('teasers');

teasersApp.controller('teasersControllerMain', ['$scope', '$http', '$routeParams','$rootScope' ,'$location', 'growl',
  function($scope, $http, $routeParams,$rootScope ,$location, growl) {

    var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;
  $scope.nameonly= "nameonly";
  var refresh = function() {

    $http.get('/api/v1/secure/teasers').success(function(response) {

      $scope.teasersList = response;
      $scope.teasers = "";

      switch($scope.mode)    {
        case "add":
        $scope.teasers = "";
        break;

        case "edit":
        $scope.teasers = $http.get('/api/v1/secure/teasers/' + id).success(function(response){
          $scope.teasers = response;
          $scope.array = response.externalLink;
          $scope.teasers.startDate = new Date($scope.teasers.createdOn);

        });

      } // switch scope.mode ends
    }); // get fact call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    // set createdBy based on the user picker value
    $scope.teasers.createdBy = $rootScope.user._id;
    $scope.teasers.externalLink = $scope.array;
    switch($scope.mode)    {
      case "add":
      $scope.create();
      break;

      case "edit":
      $scope.update();
      break;
      } // end of switch scope.mode ends

      $location.path("teasers/list");
  } // end of save method

  $scope.create = function() {
    $http.post('/api/v1/secure/teasers', $scope.teasers).success(function(response) {
      refresh();
      growl.info(parse("fact [%s]<br/>Added successfully", $scope.teasers.title));
    })
    .error(function(data, status){
      growl.error("Error adding fact");
    }); // http post keynoges ends
  }; // create method ends

  $scope.delete = function(teasers) {
    var title = teasers.title;
    $http.delete('/api/v1/secure/teasers/' + teasers._id).success(function(response) {
      refresh();
      growl.info(parse("teasers [%s]<br/>Deleted successfully", title));
    })
    .error(function(data, status){
      growl.error("Error deleting fact");
    }); // http delete keynoges ends
  }; // delete method ends

  $scope.update = function() {
    $http.put('/api/v1/secure/teasers/' + $scope.teasers._id, $scope.teasers).success(function(response) {
      refresh();
      growl.info(parse("fact [%s]<br/>Edited successfully", $scope.teasers.title));
    })
    .error(function(data, status){
      growl.error("Error updating fact");
    }); // http put keynoges ends
  }; // update method ends

  $scope.cancel = function() {

    $scope.teasers="";
    $location.path("teasers/list");
  }

  $scope.getUser = function(){
    console.log($scope.teasers.createdBy);

    $http.get('/api/v1/secure/admin/users/' + $scope.teasers.createdBy).success(function(response) {
      console.log(response);
      var user = response;
      $scope.teasers.createdBy = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);
    });
  }

}])
