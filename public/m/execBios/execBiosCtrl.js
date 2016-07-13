var bios = angular.module('execBios', ['ngRoute']);

bios.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/execBios/:id', {
	    templateUrl: '/public/m/execBios/execBios.html',
	    controller: 'execBiosCtrl'
	})

	.when('/execBios', {
		templateUrl: '/public/m/execBios/execBios.html',
		controller: 'execBiosCtrl'
	})

}]);
/*
bios.controller('execBiosBlankCtrl', function($rootScope, $routeParams, $location, appService, appServicem) {

	appServicem.activeVisit($routeParams.id).then(function(avisit){
		$location.path("execBios/" + avisit._id);
	})

});*/

bios.controller('execBiosCtrl', function($scope, $rootScope, $location, $routeParams, $http, appService, appServicem) {
	$scope.title = 'No active visit';
	appServicem.activeVisit($routeParams.id).then(function(avisitt){
	/*	$location.path("execBios/" + avisitt._id);*/
		console.log(avisitt);
		$scope.visit = avisitt._id;
		console.log($scope.visit);
$scope.title = avisitt.client.name + ' Visit to CSC India';
$scope.message = "";
 $scope.activevisits = true;
  if(avisitt == 'Not active visit'){
   $scope.title = 'No active visit'

  };



	$http.get('/api/v1/secure/visits/'+$scope.visit+'/execs',{
		cache: true
	}).success(function(response) {
		$scope.cscData = response["employees"];
		$scope.clientData = response["clients"];
		$scope.uniClient = [];
		//console.log($scope.clientData);
		for (var i = 0; i < $scope.clientData.length; i++) {
			if($scope.clientData[i].association == "customer" || $scope.clientData[i].association == "CUSTOMER"){
				$scope.uniClient.push($scope.clientData[i]);
			}
		}

		for (var i = 0; i < $scope.clientData.length; i++) {
			if($scope.clientData[i].association == "employee" || $scope.clientData[i].association == "employee"){
				$scope.cscData.push($scope.clientData[i]);
			}
		}
		console.log($scope.uniClient);
		console.log($scope.cscData);
	})

  $scope.collapseDiv = function(index, text){
      var ele = angular.element(document.getElementById(text + index));
      ele.toggle();
      var status = window.getComputedStyle(ele[0], null).getPropertyValue("display");
      if(status === "block"){
          ele.prev().addClass('chevron-down-arrow');
      } else if(status === "none") {
          ele.prev().removeClass('chevron-down-arrow');
      }
  };

  });
});
