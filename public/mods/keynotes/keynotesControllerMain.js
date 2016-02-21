'use strict';

var keynotesApp = angular.module('keynotes');

keynotesApp.controller('keynotesControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl', 
  function($scope, $http, $routeParams, $location, growl) {

  var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;

  var refresh = function() {

    $http.get('/api/v1/keynotes').success(function(response) {

      $scope.keynotesList = response;
      $scope.keynotes = "";

      switch($scope.mode)    {
        case "add":
          $scope.keynotes = "";
          break;

        case "edit":
          $scope.keynotes = $http.get('/api/v1/keynotes/' + id).success(function(response){
            $scope.keynotes = response;

            // reformat date fields to avoid type compability issues with <input type=date on ng-model
            $scope.keynotes.startDate = new Date($scope.keynotes.createdOn);
          });

      } // switch scope.mode ends
    }); // get keynote call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    switch($scope.mode)    {
      case "add":
        $scope.create();
        break;

      case "edit":
        $scope.update();
        break;
      } // end of switch scope.mode ends

      $location.path("/");
  } // end of save method

  $scope.create = function() {
    $http.post('/api/v1/keynotes', $scope.keynotes).success(function(response) {
      refresh();
      growl.info(parse("Keynote [%s]<br/>Added successfully", $scope.keynotes.title));
    })
    .error(function(data, status){
      growl.error("Error adding keynote");
    }); // http post keynoges ends
  }; // create method ends

  $scope.delete = function(keynotes) {
    var title = keynotes.title;
    $http.delete('/api/v1/keynotes/' + keynotes._id).success(function(response) {
      refresh();
      growl.info(parse("Keynotes [%s]<br/>Deleted successfully", title));
    })
    .error(function(data, status){
      growl.error("Error deleting keynote");
    }); // http delete keynoges ends
  }; // delete method ends

  $scope.update = function() {
    $http.put('/api/v1/keynotes/' + $scope.keynotes._id, $scope.keynotes).success(function(response) {
      refresh();
      growl.info(parse("Keynote [%s]<br/>Edited successfully", $scope.keynotes.title));
    })
    .error(function(data, status){
      growl.error("Error updating keynote");
    }); // http put keynoges ends
  }; // update method ends

}]);﻿ // controller ends

