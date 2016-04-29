

var app = angular.module('home');

app.controller('homeCtrl', function ($scope, location, $routeParams, $http) {
		$scope.value=$routeParams.id;

	location.get(angular.noop, angular.noop);
	$scope.loading = true;
	$http.get('/api/v1/secure/visits/'+$routeParams.id+'/schedules',{
		cache: true
	}).success(function(response) {
        //console.log(response);
        $scope.dayHighlighter = response;
        $scope.loading = false;

          console.log($scope.dayHighlighter);
    })
});

app.controller('welcomeCtrl', ['$scope', 'location','$http','$routeParams','$rootScope', function ($scope, location,$http,$routeParams,$rootScope) {
	$scope.order = 0;
	console.log($rootScope.user.groups);
	$scope.group=$rootScope.user.groups;
	$scope.showContinue = true;
	$scope.medium = "medium";
	$scope.arrayData=[];

	$http.get('/api/v1/secure/visits/current/keynotes',{
		cache: true
	}).success(function(response) {
		if(response[0] != "")
		{
		$scope.welcomeResponse = response[0];
		$scope.length = $scope.welcomeResponse.length - 1;
		$scope.user_id = $scope.welcomeResponse[$scope.order].noteBy;
		$http.get('/api/v1/secure/admin/users/' + $scope.user_id,{
		cache: true
	}).success(function(response) {
			$scope.user = response;
		})
		if(response[0].length == 1)
		{
			$scope.showContinue = false;
		}
		}

		else
		{
			console.log("No keynotes Defined");
		}
	})


	$scope.orderIncrement = function()
	{
		$scope.order = $scope.order + 1;
		$scope.user_id = $scope.welcomeResponse[$scope.order].noteBy;
		$http.get('/api/v1/secure/admin/users/' + $scope.user_id,{
		cache: true
	}).success(function(response) {
			$scope.user = response;
		})
		if($scope.order == $scope.length)
		{
			$scope.showContinue = false;
			// $scope.order = 0;
		}

		if($scope.order < $scope.length)
		{
			$scope.showContinue = true;
		}
	}
}]);



app.controller('homeBlankCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
	$http.get('/api/v1/secure/visits/all/activeVisit',{
		cache: true
	}).success(function(response) {
		console.log(response);
		$location.path("home/" + response.visits._id);
	})
}]);