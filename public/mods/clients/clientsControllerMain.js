'use strict';

var clientsApp = angular.module('clients');

clientsApp.controller('clientsControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl', 
  function($scope, $http, $routeParams, $location, growl) {

  var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;

  /*$scope.noteById = "";
  $scope.noteByEmail = "";
  $scope.noteByUser =  "";*/

  $scope.salesExecId = "";
  $scope.salesExecEmail = "";
  $scope.salesExecUser =  "";
  

  var refresh = function() {

    $http.get('/api/v1/clients').success(function(response) {

      $scope.clientsList = response;
      $scope.clients = "";

      switch($scope.mode)    {
        case "add":
          $scope.clients = "";
          break;

        case "edit":
          $scope.clients = $http.get('/api/v1/clients/' + id).success(function(response){
            $scope.clients = response;
      
            console.log($scope.clients);
            console.log(response.cscPersonnel);
            /*$scope.noteByUser = response.cscPersonnel;
            $scope.noteByEmail = response.cscPersonnel.email;
            $scope.noteById = response.cscPersonnel._id;*/
            
            $scope.salesExecUser = response.cscPersonnel;
            $scope.salesExecEmail = response.cscPersonnel.email;
            $scope.salesExecId = response.cscPersonnel._id;
            
            // reformat date fields to avoid type compability issues with <input type=date on ng-model
            $scope.clients.startDate = new Date($scope.clients.createdOn);
          });

      } // switch scope.mode ends
    }); // get client call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    // set noteBy based on the user picker value
    $scope.clients.cscPersonnel = $scope.salesExecId;
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
    $http.post('/api/v1/clients', $scope.clients).success(function(response) {
      refresh();
      growl.info(parse("client [%s]<br/>Added successfully", $scope.clients.name));
    })
    .error(function(data, status){
      growl.error("Error adding client");
    }); // http post keynoges ends
  }; // create method ends

  $scope.delete = function(clients) {
    var name = clients.name;
    $http.delete('/api/v1/clients/' + clients._id).success(function(response) {
      refresh();
      growl.info(parse("clients [%s]<br/>Deleted successfully", name));
    })
    .error(function(data, status){
      growl.error("Error deleting client");
    }); // http delete keynoges ends
  }; // delete method ends

  $scope.update = function() {
    $http.put('/api/v1/clients/' + $scope.clients._id, $scope.clients).success(function(response) {
      refresh();
      growl.info(parse("client [%s]<br/>Edited successfully", $scope.clients.name));
    })
    .error(function(data, status){
      growl.error("Error updating client");
    }); // http put keynoges ends
  }; // update method ends

  $scope.cancel = function() {

    $scope.clients="";
    $location.path("/");
  }

  $scope.getUser = function(){
    console.log($scope.clients.cscPersonnel);

    $http.get('/api/v1/admin/users/' + $scope.clients.cscPersonnel).success(function(response) {
      console.log(response);
      var user = response;
      $scope.clients.cscPersonnel = parse("%s %s, <%s>", user.name.first, user.name.last, user.email); 
    });
  }

}]);﻿ // controller ends

