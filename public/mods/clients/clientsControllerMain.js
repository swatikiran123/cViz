'use strict';

var clientsApp = angular.module('clients');

clientsApp.controller('clientsControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl',
	function($scope, $http, $routeParams, $location, growl) {

		var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;

  $http.get('/api/v1/secure/lov/regions').success(function(response) {
    console.log(response);
    $scope.regions=response.values;
    console.log($scope.regions)
  });

  $http.get('/api/v1/secure/lov/offerings').success(function(response) {
    console.log(response);
    $scope.offerings=response.values;
    console.log($scope.offerings)
  });

  $scope.small= "small";
  $scope.large= "LARGE";
  $scope.medium= "medium";


  $scope.cscPersonnel={};

  $scope.salesExecId = "";
  $scope.salesExecEmail = "";
  $scope.salesExecUser =  "";

  $scope.accountGMId = "";
  $scope.accountGMEmail = "";
  $scope.accountGMUser =  "";

  $scope.industryExecId = "";
  $scope.industryExecEmail = "";
  $scope.industryExecUser =  "";

  $scope.globalDeliveryId = "";
  $scope.globalDeliveryEmail = "";
  $scope.globalDeliveryUser =  "";

  $scope.creId = "";
  $scope.creEmail = "";
  $scope.creUser =  "";

  var refresh = function() {

    $http.get('/api/v1/secure/clients').success(function(response) {

      $scope.clientsList = response;
      $scope.clients = "";

      switch($scope.mode)    {
       case "add":
       $scope.clients = "";
       break;

       case "edit":
       $scope.clients = $http.get('/api/v1/secure/clients/id/' + id).success(function(response){
        $scope.clients = response;

        $scope.salesExecUser = response.cscPersonnel.salesExec;
        $scope.salesExecEmail = response.cscPersonnel.salesExec.email;
        $scope.salesExecId = response.cscPersonnel.salesExec._id;

        $scope.accountGMUser = response.cscPersonnel.accountGM;
        $scope.accountGMEmail = response.cscPersonnel.accountGM.email;
        $scope.accountGMId = response.cscPersonnel.accountGM._id;

        $scope.industryExecUser = response.cscPersonnel.industryExec;
        $scope.industryExecEmail = response.cscPersonnel.industryExec.email;
        $scope.industryExecId = response.cscPersonnel.industryExec._id;

        $scope.globalDeliveryUser = response.cscPersonnel.globalDelivery;
        $scope.globalDeliveryEmail = response.cscPersonnel.globalDelivery.email;
        $scope.globalDeliveryId = response.cscPersonnel.globalDelivery._id;

        $scope.creUser = response.cscPersonnel.cre;
        $scope.creEmail = response.cscPersonnel.cre.email;
        $scope.creId = response.cscPersonnel.cre._id;

            // reformat date fields to avoid type compability issues with <input type=date on ng-model
            $scope.clients.startDate = new Date($scope.clients.createdOn);
          });

      } // switch scope.mode ends
    }); // get client call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    console.log($scope.regions);
    // set noteBy based on the user picker value
    $scope.cscPersonnel.salesExec = $scope.salesExecId;
    $scope.cscPersonnel.accountGM= $scope.accountGMId;
    $scope.cscPersonnel.industryExec = $scope.industryExecId;
    $scope.cscPersonnel.globalDelivery = $scope.globalDeliveryId;
    $scope.cscPersonnel.cre= $scope.creId;
    switch($scope.mode)    {
    	case "add":
    	$scope.create();
    	break;

    	case "edit":
    	$scope.update();
    	break;
      } // end of switch scope.mode ends

      $location.path("clients/list");
  } // end of save method

  $scope.create = function() {
    var inData  = $scope.clients;
    inData.cscPersonnel =$scope.cscPersonnel;

    $http.post('/api/v1/secure/clients', inData).success(function(response) {
      refresh();
      growl.info(parse("client [%s]<br/>Added successfully", $scope.clients.name));
    })
    .error(function(data, status){
      growl.error("Error adding client");
    }); // http post keynoges ends
  }; // create method ends

  $scope.delete = function(clients) {
  	var name = clients.name;
  	$http.delete('/api/v1/secure/clients/' + clients._id).success(function(response) {
  		refresh();
  		growl.info(parse("clients [%s]<br/>Deleted successfully", name));
  	})
  	.error(function(data, status){
  		growl.error("Error deleting client");
    }); // http delete keynoges ends
  }; // delete method ends

  $scope.update = function() {
    var inData  = $scope.clients;
    inData.cscPersonnel =$scope.cscPersonnel;

    $http.put('/api/v1/secure/clients/id/' + $scope.clients._id, inData).success(function(response) {
      refresh();
      growl.info(parse("client [%s]<br/>Edited successfully", $scope.clients.name));
    })
    .error(function(data, status){
      growl.error("Error updating client");
    }); // http put keynoges ends
  }; // update method ends

  $scope.cancel = function() {

  	$scope.clients="";
  	$location.path("clients/list");
  }

  $scope.getUser = function(){


  	$http.get('/api/v1/secure/admin/users/' + $scope.cscPersonnel).success(function(response) {

  		var user = response;
  		$scope.cscPersonnel.salesExec = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);
      $scope.cscPersonnel.accountGM = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);
      $scope.cscPersonnel.industryExec = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);
      $scope.cscPersonnel.globalDelivery = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);
      $scope.cscPersonnel.cre = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);

    });
  }

}]);﻿ // controller ends
