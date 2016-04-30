var bios = angular.module('execBios', ['ngRoute']);

bios.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/execBios/:id', {
	    templateUrl: '/public/m/execBios/execBios.html',
	    controller: 'execBiosCtrl'
	})

	.when('/execBios', {
		templateUrl: '/public/m/dummy.html',
		controller: 'execBiosBlankCtrl'
	})

}]);

bios.controller('execBiosBlankCtrl', function($rootScope, $location) {
	if($rootScope.activeVisit !== undefined)
		$location.path("execBios/" + $rootScope.activeVisit._id);
});

bios.controller('execBiosCtrl', function($scope, $rootScope, $routeParams, $http) {
	$scope.title= $rootScope.activeVisit.title;

	$http.get('/api/v1/secure/visits/'+$routeParams.id+'/execs',{
		cache: true
	}).success(function(response) {
		$scope.cscData = response["employees"];
		$scope.clientData = response["clients"];
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
