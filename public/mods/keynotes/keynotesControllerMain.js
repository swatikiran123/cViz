'use strict';

var keynotesApp = angular.module('keynotes');

keynotesApp.controller('keynotesControllerMain', ['$scope', 
  function($scope) {}]);

/*keynotesApp.controller('keynotesControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl', 
  function($scope, $http, $routeParams, $location, growl) {

  var id = $routeParams.id;
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;
  console.log("Id:" + id + ":" + $scope.mode);

  var refresh = function() {
    $http.get('/api/v1/keynotes').success(function(response) {
      console.log("I got the data I requested");
      $scope.keynotesList = response;
      $scope.keynotes = "";

      switch($scope.mode)    {
        case "add":
          $scope.keynotes = "";
          console.log('add mode ready')
          break;

        case "edit":
          $scope.keynotes = $http.get('/api/v1/keynotes/' + id).success(function(response){
          $scope.keynotes = response;

        // reformat date fields to avoid type compability issues with <input type=date on ng-model
        $scope.keynotes.startDate = new Date($scope.keynotes.createdOn);
      });
      console.log('edit mode to be implemented');

      }
    });
  };

  refresh();

  $scope.create = function() {
    console.log($scope.keynotes);
    $http.post('/api/v1/keynotes', $scope.keynotes).success(function(response) {
      console.log(response);
      refresh();
      growl.info(parse("keynotes with Title: %s added successfully", $scope.keynotes.title));
    });
  };

  $scope.delete = function(keynotes) {
    //console.log(sub("Delete[keynotes::#{id}]"));
    var title = keynotes.title;
    $http.delete('/keynotesApi/' + keynotes._id).success(function(response) {
      refresh();
      growl.info(parse("keynotes with Title: %s added successfully", title));
    });
  };

  $scope.update = function(id) {
    console.log(sub("Update[keynotes::#{id}]"));
    $http.get('/keynotesApi/' + id).success(function(response) {
      $scope.keynotes = response;
    });
  };  

  $scope.update = function() {
    console.log(("Delete[keynotes::#{id}]"));
    console.log($scope.keynotes._id);
    $http.put('/keynotesApi/' + $scope.keynotes._id, $scope.keynotes).success(function(response) {
      refresh();
      growl.info(parse("keynotes with Title: %s edited successfully", $scope.keynotes.title));
    })
  };

  $scope.save = function(){
  switch($scope.mode)    {
    case "add":
      $scope.create();
      console.log("create keynotes");
      break;

    case "edit":
      $scope.update();
      console.log("update keynotes");
      break;
    }

    $location.path("/keynotes/list");
  }

  $scope.deselect = function() {
    $scope.keynotes = "";
  }

}]);﻿
*/
/*keynotesApp.directive('uiDate', function() {
    return {
      require: '?ngModel',
      link: function($scope, element, attrs, controller) {
        var originalRender, updateModel, usersOnSelectHandler;
        if ($scope.uiDate == null) $scope.uiDate = {};
        if (controller != null) {
          updateModel = function(value, picker) {
            return $scope.$apply(function() {
              return controller.$setViewValue(element.datepicker("getDate"));
            });
          };
          if ($scope.uiDate.onSelect != null) {
            usersOnSelectHandler = $scope.uiDate.onSelect;
            $scope.uiDate.onSelect = function(value, picker) {
              updateModel(value);
              return usersOnSelectHandler(value, picker);
            };
          } else {
            $scope.uiDate.onSelect = updateModel;
          }
          originalRender = controller.$render;
          controller.$render = function() {
            originalRender();
            return element.datepicker("setDate", controller.$viewValue);
          };
        }
        return element.datepicker($scope.uiDate);
      }
    };
  });*/
