'use strict';

var visitsApp = angular.module('visits');

visitsApp.controller('sessionsControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl', '$filter', '$mdDialog',
  function($scope, $http, $routeParams ,$location, growl, $filter, $mdDialog) {

		console.log("session controller running");

		$scope.visitId = $routeParams.id;

		$scope.small= "small";
		$scope.large= "LARGE";
		$scope.medium= "medium";

		$scope.ownerId = "";
		$scope.ownerEmail = "";
		$scope.ownerUser = "";

		$scope.supporterId = "";
		$scope.supporterEmail = "";
		$scope.supporterUser = "";

		$scope.mode = "add";

		var init = function() {
			console.log("init...")
			$http.get('/api/v1/secure/visits/' + $scope.visitId).success(function(response) {
				$scope.visit = response;
				$scope.visitStartDate = $scope.visit.startDate;
				$scope.visitEndDate = $scope.visit.endDate;
				$scope.scheduleDates = $scope.buildScheduleDates();
			});
			console.log("init complete");
		}

		var refresh = function(){
			console.log("refresh init");
			$http.get('/api/v1/secure/visitSchedules/visit/' + $scope.visitId ).success(function(response) {
				$scope.scheduleList = response;
			}); // get visitSchedule call back ends
			console.log("refresh complete");
		}; // refresh method ends

		init();
		refresh();

	  $scope.buildScheduleDates = function()
	  {
			return DatesInRange($scope.visitStartDate, $scope.visitEndDate);
	  }

		$scope.setEntryDate = function(dt){
			if(dt==="all")
				$scope.entryDate = "";
			else
				$scope.entryDate = dt;
		}

		$scope.dayFilter = function (schedule) {
			if($scope.entryDate === "")
				return true;

			var dt1 = moment.utc(schedule.scheduleDate);
			var dt2 = moment.utc($scope.entryDate);

			var duration = moment.duration(dt2.diff(dt1));
			var days = duration.asDays();

			return (days==0);
		};

		$scope.addSchedule = function(){
	    $scope.mode = "add";
	    console.log("Add new for::" + $scope.entryDate);
			$scope.schedule="";
			angular.element('#myModalShower').trigger('click');
	  }

	  $scope.addSchedule1 = function(ev){
	    $scope.mode = "add";
	    console.log("Entry for::" + $scope.entryDate);
			$scope.schedule="";
	    $scope.showAdvanced(ev);
	  }

	  $scope.editSession = function(ev, id){
	    $scope.mode = "edit";
	    $http.get('/api/v1/secure/visitSchedules/' + id ).success(function(response) {
	      $scope.schedule = response;
				// reassign data
	      $scope.startTime = DateGetTime($scope.schedule.session.startTime);
	      $scope.endTime = DateGetTime($scope.schedule.session.endTime);
				$scope.ownerId = $scope.schedule.session.owner;
				$scope.supporterId = $scope.schedule.session.supporter;
				console.log("edit session...");
				console.log($scope.schedule);
	      $scope.showAdvanced(ev);
	    }); // get visitSchedule call back ends
	  }

		// $scope.editSession1 = function(id){
		// 	$scope.mode = "edit";
		// 	$http.get('/api/v1/secure/visitSchedules/' + id ).success(function(response) {
		// 		$scope.schedule = response;
		// 		$scope.schedule.startTime = new Date($scope.schedule.startTime);
		// 		$scope.schedule.endTime = new Date($scope.schedule.endTime);
		// 		angular.element('#myModalShower').trigger('click');
		// 	}); // get visitSchedule call back ends
		// }

	  $scope.deleteSession = function(schedule) {
	    $http.delete('/api/v1/secure/visitSchedules/' + schedule._id).success(function(response) {
	      growl.info(parse("Title: [%s]<br/>Session schedule deleted successfully", schedule.session.title));
	      refresh();
	    })
	    .error(function(data, status) {
	      growl.error("Error deleting visitSchedule");
	    }); // http delete visitSchedule ends
	  }; // delete method ends

	  $scope.save = function() {
			console.log("session save init for " + $scope.entryDate);
	    $scope.schedule.scheduleDate = $scope.entryDate;
	    $scope.schedule.visit = $scope.visit._id;
	    $scope.schedule.client = $scope.visit.client._id;
			//session invitees to be added

			// session info
			$scope.schedule.session.owner = $scope.ownerId;
	    $scope.schedule.session.supporter = $scope.supporterId;
	    $scope.schedule.session.startTime = DateReplaceTime($scope.entryDate, $scope.startTime);
	    $scope.schedule.session.endTime = DateReplaceTime($scope.entryDate, $scope.endTime);

	    switch ($scope.mode) {
	      case "add":
	        $scope.create();
	        break;

	      case "edit":
	        $scope.update();
	        break;
	    } // end of switch scope.mode ends
			console.log("session save done")
	  } // end of save method

	  $scope.create = function() {
			console.log("Save new...");
			console.log($scope.schedule);
	    $http.post('/api/v1/secure/visitSchedules', $scope.schedule).success(function(response) {
				console.log("add complete");
	      growl.info(parse("Title: [%s]<br/>New session schedule added", $scope.schedule.session.title));
				refresh();
	    })
	    .error(function(data, status) {
	      growl.error("Error adding visitSchedule");
	    }); // http post visitSchedule ends
	  }; // create method ends

	  $scope.update = function() {
			console.log("Save update...");
			console.log($scope.schedule);
	    $http.put('/api/v1/secure/visitSchedules/' + $scope.schedule._id, inData).success(function(response) {
	      growl.info(parse("Title: [%s]<br/>Session schedule updated successfully", $scope.schedule.session.title));
				refresh();
	    })
	    .error(function(data, status) {
	    	growl.error("Error updating visitSchedule");
	    }); // http put visitSchedule ends
	  }; // update method ends

	  // type field dropdown list
	  $scope.prTypes = ['presentation','discussion','tea','lunch','dinner','floor-walk'];

	  // location field dropdown list
	  $scope.locations = [{
	    "city" : "Hyderabad",
	    "rooms": ['Hyd Board Room','B7 1st Floor Conference Room','B4 Cafeteria',
	    'B4 Executive Dining Room','Hyd Amphi Theatre','Hyd Main Lobby']
	  },
	  {
	    "city" : "Noida",
	    "rooms": ['Noida Board Room','Noida Cafeteria','Noida Amphi Theatre','Noida Main Lobby']
	  },
	  {
	    "city" : "Chennai",
	    "rooms": ['Chennai Lobby Area','Chennai Ex Lunch','Chennai Amphi Theatre','Chennai Main Lobby']
	  },
	  {
	    "city" : "Bangalore",
	    "rooms": ['Bng Lobby Area','Bng Ex Lunch','Bng Amphi Theatre','Bng Main Lobby']
	  }];


		$scope.showAdvanced = function(ev) {
			$mdDialog.show({
				templateUrl: '/public/mods/visits/sessions/sessionAddDialog0.html',
				parent: angular.element(document.body),
				scope:$scope.$new(),
				targetEvent: ev,
				clickOutsideToClose:false
			})
			.then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function() {
				$scope.status = 'You cancelled the dialog.';
			});

		}

		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};

	}

]);
