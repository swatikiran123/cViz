'use strict';

var factsApp = angular.module('facts');

factsApp.controller('factsControllerMain', ['$scope', '$http', '$routeParams','$rootScope' ,'$location', 'growl',
  function($scope, $http, $routeParams,$rootScope ,$location, growl) {

    var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;
  $scope.nameonly= "nameonly";
  var refresh = function() {

    $http.get('/api/v1/secure/facts').success(function(response) {

      $scope.factsList = response;
      $scope.facts = "";

      switch($scope.mode)    {
        case "add":
        $scope.facts = "";
        break;

        case "edit":
        $scope.facts = $http.get('/api/v1/secure/facts/' + id).success(function(response){
          $scope.facts = response;
          $scope.facts.startDate = new Date($scope.facts.createdOn);
        });

      } // switch scope.mode ends
    }); // get fact call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    // set editedBy based on the user picker value
    $scope.facts.editedBy = $rootScope.user._id;
    switch($scope.mode)    {
      case "add":
      $scope.create();
      break;

      case "edit":
      $scope.update();
      break;
      } // end of switch scope.mode ends

      $location.path("facts/list");
  } // end of save method

  $scope.create = function() {
    $http.post('/api/v1/secure/facts', $scope.facts).success(function(response) {
      refresh();
      growl.info(parse("fact [%s]<br/>Added successfully", $scope.facts.title));
    })
    .error(function(data, status){
      growl.error("Error adding fact");
    }); // http post keynoges ends
  }; // create method ends

  $scope.delete = function(facts) {
    var title = facts.title;
    $http.delete('/api/v1/secure/facts/' + facts._id).success(function(response) {
      refresh();
      growl.info(parse("facts [%s]<br/>Deleted successfully", title));
    })
    .error(function(data, status){
      growl.error("Error deleting fact");
    }); // http delete keynoges ends
  }; // delete method ends

  $scope.update = function() {
    $http.put('/api/v1/secure/facts/' + $scope.facts._id, $scope.facts).success(function(response) {
      refresh();
      growl.info(parse("fact [%s]<br/>Edited successfully", $scope.facts.title));
    })
    .error(function(data, status){
      growl.error("Error updating fact");
    }); // http put keynoges ends
  }; // update method ends

  $scope.cancel = function() {

    $scope.facts="";
    $location.path("facts/list");
  }

  $scope.getUser = function(){
    console.log($scope.facts.editedBy);

    $http.get('/api/v1/secure/admin/users/' + $scope.facts.editedBy).success(function(response) {
      console.log(response);
      var user = response;
      $scope.facts.editedBy = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);
    });
  }

}])
