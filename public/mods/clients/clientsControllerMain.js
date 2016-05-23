'use strict';

var clientsApp = angular.module('clients');

clientsApp.controller('clientsControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl','$mdDialog', '$mdMedia', '$timeout','Upload','$rootScope',
  function($scope, $http, $routeParams, $location, growl,$mdDialog,$mdMedia,$timeout,Upload,$rootScope) {

    var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;

  $scope.clientModule=true;
  $scope.showAvatar =false;
  //regions - Http get for drop-down
  $http.get('/api/v1/secure/lov/regions').success(function(response) {
    $scope.regions=response.values;
  });
  $scope.isSaving=false;
  if ($rootScope.user.groups.indexOf("vManager") > -1 ) {
    $scope.isSaving= true; 
  }
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
        $scope.parentSelected= $scope.clients.name;
        $scope.childSelected= $scope.clients.subName;
        $scope.industrySelected= $scope.clients.industry;
        $scope.regionsSelected= $scope.clients.regions;

        // $scope.selected-object= $scope.clients.name;

        // $scope.selectedClient= $scope.clients.name;
        console.log($scope.clients)
        if (response.logo!=undefined) {
          $scope.showAvatar = true
          $scope.avatar= response.logo;
        }
        else $scope.showAvatar = false;
    // reformat date fields to avoid type compability issues with <input type=date on ng-model
    $scope.clients.startDate = new Date($scope.clients.createdOn);
  });

      } // switch scope.mode ends
    }); // get client call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    console.log();
    // set noteBy based on the user picker value
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
    if ($rootScope.user.groups.indexOf("admin") > -1 ) {
      inData.status="final";
    }else 
      inData.status="draft";

    if ($scope.avatar!=undefined) {
      inData.logo=avatar;}
      console.log(inData)
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
    inData.logo=$scope.avatar;

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

  $scope.addClientLogo = function(ev) {
    $mdDialog.show({
      templateUrl: '/public/mods/clients/clientLogoDialog.html',
      scope: $scope.$new(),
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true

    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });

  };

  $scope.addlogo = function (dataUrl) {
    Upload.upload({
      url: '/api/v1/upload/visits',
      data: {
        file: Upload.dataUrltoBlob(dataUrl),
      },
    }).then(function (response) {
      $scope.userdata ='';
      $scope.result = response.data;
      var filepath = response.data.file.path;
      var imagepath = '/'+ filepath.replace(/\\/g , "/");
      $scope.avatar = imagepath;
      $scope.showAvatar = true;
      $mdDialog.hide();
    });

  };

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.canceldialog = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

}]);﻿ // controller ends