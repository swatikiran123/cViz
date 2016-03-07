'use strict';

var schedulerApp = angular.module('scheduler', ['ngFloatingLabels', "kendo.directives"]);

schedulerApp.controller('schedulerController', ['$scope', '$http', '$routeParams', 'growl',
  function($scope, $http, $routeParams, growl) {

  $scope.visitId = $routeParams.id;

  $scope.ownerId = "";
  $scope.ownerEmail = "";
  $scope.ownerUser = "";

  $scope.supporterId = "";
  $scope.supporterEmail = "";
  $scope.supporterUser = "";

  var refresh = function() {

    $scope.visit="";
    $scope.schedule={};

    $http.get('/api/v1/secure/visits/' + $scope.visitId).success(function(response) {
      $scope.visit = response;
      $scope.visitStartDate = $scope.visit.schedule[0].startDate;
      $scope.visitEndDate = $scope.visit.schedule[$scope.visit.schedule.length-1].endDate;
      $scope.scheduleDates = $scope.buildScheduleDates();
    });

    $http.get('/api/v1/secure/visitSchedules/visit/' + $scope.visitId ).success(function(response) {
      $scope.scheduleList = response;
    }); // get visitSchedule call back ends
  }; // refresh method ends

  refresh();

  $scope.buildScheduleDates = function()
  {
    var scheduleDates = [];
    for (var d = new Date($scope.visitStartDate); d <= new Date($scope.visitEndDate); d.setDate(d.getDate() + 1)) {
        scheduleDates.push(new Date(d));
    }
    return scheduleDates;
  }

  $scope.addSession = function(){
    $scope.mode = "add";
    $scope.toggleModal();
  }

  $scope.editSession = function(id){
    $scope.mode = "edit";
    $http.get('/api/v1/secure/visitSchedules/' + id ).success(function(response) {
      $scope.schedule = response;
      $scope.schedule.startTime = new Date($scope.schedule.startTime);
      $scope.schedule.endTime = new Date($scope.schedule.endTime);
    }); // get visitSchedule call back ends
    $scope.toggleModal();
  }

  $scope.deleteSession = function(schedule) {
    $http.delete('/api/v1/secure/visitSchedules/' + session._id).success(function(response) {
      refresh();
      growl.info(parse("Title: [%s]<br/>Session schedule deleted successfully", visit));
    })
    .error(function(data, status) {
      growl.error("Error deleting visitSchedule");
    }); // http delete visitSchedule ends
  }; // delete method ends

  $scope.save = function() {
    $scope.schedule.owner = $scope.ownerId;
    $scope.schedule.supporter = $scope.supporterId;
    $scope.schedule.scheduleDate = $scope.scheduleDate;
    $scope.schedule.visit = $scope.visit._id;
    $scope.schedule.client = $scope.visit.client._id;

    console.log("Session ["+ $scope.mode +"]"+ JSON.stringify( $scope.schedule));
    switch ($scope.mode) {
      case "add":
        $scope.create();
        break;

      case "edit":
        $scope.update();
        break;
    } // end of switch scope.mode ends
    $scope.toggleModal();
  } // end of save method

  $scope.create = function() {

    $http.post('/api/v1/secure/visitSchedules', $scope.schedule).success(function(response) {
      refresh();
      growl.info(parse("Title: [%s]<br/>New session schedule added", $scope.schedule.title));
    })
    .error(function(data, status) {
      growl.error("Error adding visitSchedule");
    }); // http post visitSchedule ends
  }; // create method ends

  $scope.update = function() {
    $http.put('/api/v1/secure/visitSchedules/' + $scope.visit_schedules._id, inData).success(function(response) {
      refresh();
      growl.info(parse("Title: [%s]<br/>Session schedule updated successfully", $scope.visit_schedules.visit));
    })
    .error(function(data, status) {
    growl.error("Error updating visitSchedule");
    }); // http put visitSchedule ends
  }; // update method ends

  $scope.cancel = function() {
    $scope.toggleModal();
  }

  $scope.showModal = false;
  $scope.toggleModal = function() {
      $scope.showModal = !$scope.showModal;
  };

  // type field dropdown list
  $scope.type = [{
      session: 'presentation'
  }, {
      session: 'discussion'
  }, {
      session: 'tea'
  }, {
      session: 'lunch'
  }, {
      session: 'dinner'
  }, {
      session: 'floor-walk'
  }];

    // location field dropdown list
    $scope.location = [{
        session: 'Board Room'
    }, {
        session: '1st Floor Conference Room'
    }, {
        session: 'B4 Cafeteria'
    }, {
        session: 'B4 Executive Dining Room'
    }, {
        session: 'Amphi Theatre'
    }, {
        session: 'Main Lobby'
    }];

  }
]);

// Pop up directive
schedulerApp.directive('modal', function() {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">{{ title }}</h4>' +
            '</div>' +
            '<div class="modal-body" ng-transclude></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});
