'use strict';

var visitsApp = angular.module('visits');

visitsApp.controller('visitsControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl', 
  function($scope, $http, $routeParams, $location, growl) {

    var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;
  $scope.schedules=[];
  $scope.visitors=[];
  

  $scope.visitorId = "";
  $scope.visitor = "";
  $scope.visitorUser =  "";

  $scope.agmId = "";
  $scope.agmEmail = "";
  $scope.agmUser =  "";

  $scope.anchorId = "";
  $scope.anchorEmail = "";
  $scope.anchorUser =  "";

  $scope.createById = "";
  $scope.createByEmail = "";
  $scope.createByUser =  "";

  var refresh = function() {

    $http.get('/api/v1/secure/visits').success(function(response) {
      console.log(response);
      console.log($scope.visits);
      $scope.visitsList = response;
      $scope.visits = "";
      $scope.schedules=[];
      $scope.visitors=[];

      switch($scope.mode)    {
        case "add":
        $scope.visits = "";
        break;

        case "edit":
        $scope.visits = $http.get('/api/v1/secure/visits/' + id).success(function(response){
          var visits = response;
          $scope.schedules = visits.schedule;       //list of schedules
          $scope.visitors = visits.visitors;      //list of visitors
          $scope.visits = visits;               //whole form object
          //$scope.visits = response;
          console.log($scope.visitors);
          console.log($scope.schedules);
          console.log($scope.visits);
          console.log(response.agm);
          console.log(response.anchor);
          console.log(response.createBy);

          $scope.agmUser = response.agm;
          $scope.agmEmail = response.agm.email;
          $scope.agmId = response.agm._id;


          $scope.anchorUser = response.anchor;
          $scope.anchorEmail = response.anchor.email;
          $scope.anchorId = response.anchor._id;

          $scope.createByUser = response.createBy;
          $scope.createByEmail = response.createBy.email;
          $scope.createById = response.createBy._id;
            // reformat date fields to avoid type compability issues with <input type=date on ng-model
            $scope.visits.createdOn = new Date($scope.visits.createdOn);
          });

      } // switch scope.mode ends
    }); // get visit call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    // set agm based on the user picker value
    $scope.visits.agm = $scope.agmId;
    $scope.visits.anchor = $scope.anchorId;
    $scope.visits.createBy = $scope.createById;

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

    console.log($scope.schedules);
    console.log($scope.visitors);
    var inData       = $scope.visits;
    inData.schedule = $scope.schedules;
    inData.visitors = $scope.visitors;
    console.log(inData);

    $http.post('/api/v1/secure/visits', inData).success(function(response) {
      refresh();
      growl.info(parse("visit [%s]<br/>Added successfully", inData.title));
    })
    .error(function(data, status){
      growl.error("Error adding visit");
    }); // http post keynoges ends
  }; // create method ends

  $scope.delete = function(visits) {
    var title = visits.title;
    $http.delete('/api/v1/secure/visits/' + visits._id).success(function(response) {
      refresh();
      growl.info(parse("visits [%s]<br/>Deleted successfully", title));
    })
    .error(function(data, status){
      growl.error("Error deleting visit");
    }); // http delete keynoges ends
  }; // delete method ends

  $scope.update = function() {

    $http.put('/api/v1/secure/visits/' + $scope.visits._id,  $scope.visits).success(function(response) {
      refresh();
      growl.info(parse("visit [%s]<br/>Edited successfully",  $scope.visits.title));
    })
    .error(function(data, status){
      growl.error("Error updating visit");
    }); // http put keynoges ends
  }; // update method ends

  $scope.cancel = function() {

    $scope.visits="";
    $location.path("/");
  }

  $scope.getUser = function(){
    console.log($scope.visits.agm);

    $http.get('/api/v1/secure/admin/users/' + inData.agm).success(function(response) {
      console.log(response);
      var user = response;
      $scope.visits.agm = parse("%s %s, <%s>", user.name.first, user.name.last, user.email); });

    $http.get('/api/v1/secure/admin/users/' + inData.anchor).success(function(response) {
      console.log(response);
      var user = response;
      $scope.visits.anchor = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);  });

    $http.get('/api/v1/secure/admin/users/' + inData.createBy).success(function(response) {
      console.log(response);
      var user = response;
      $scope.visits.createBy = parse("%s %s, <%s>", user.name.first, user.name.last, user.email); 
    });
  }

  // visit schedule table

  $scope.addSchedule=function(schedule){

    console.log(schedule.startDate);
    console.log(schedule.endDate);
    console.log(schedule.location)

    $scope.schedules.push({
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      location: schedule.location
    });

    schedule.startDate='';
    schedule.endDate='';
    schedule.location='';
  };

  $scope.removeSchedule = function(index){
    $scope.schedules.splice(index, 1);
  }; 

  $scope.editSchedule = function(index,schedule){
    console.log(schedule.location);
    $scope.schedule= schedule;
    $scope.schedules.splice(index, 1);
  };
// visit schedule table end


  // visit visitor table

  $scope.addvisitor=function(visitorDef){

   // $scope.visitorDef.visitor = $scope.visitor;
   console.log(visitorDef.influence);
   console.log(visitorDef.visitor);


   $scope.visitors.push({
    visitor: visitorDef.visitorId,
    influence: visitorDef.influence
  });

   visitorDef.influence='';
   visitorDef.visitorId='';
   visitorDef.visitor = '';
   visitorDef.visitorUser = '';
 };

 $scope.removevisitor = function(index){
  $scope.visitors.splice(index, 1);
}; 

$scope.editvisitor = function(index,visitorDef){
  console.log(visitorDef.visitor);
  $scope.visitorDef = visitorDef;
  console.log($scope.visitorDef.influence);
    //$scope.visitors.splice(index, 1);
  };
// visit visitor table end

}])

//ui-date picker
visitsApp.directive('uiDate', function() {
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
});

