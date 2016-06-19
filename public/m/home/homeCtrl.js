var app = angular.module('home');

app.controller('homeCtrl', function ($scope, location, $rootScope, $routeParams, $http, appService) {

	location.get(angular.noop, angular.noop);
	$scope.loading = true;
	$scope.finalFeedback=false;
	$scope.current = new Date();
	appService.activeVisit().then(function(avisit){
		$http.get('/api/v1/secure/visits/'+avisit._id+'/schedules',{
			cache: true
		}).success(function(response) {
			$scope.visitId = avisit._id;
			$scope.dayHighlighter = response;
			$scope.loading = false;
		})
	}, function(reason) {
		$scope.loading = false;
	})

	$http.get('/api/v1/secure/visits/all/activeVisit',{
		cache: true
	}).success(function(response) {
		$scope.endDate = response.visits.endDate;
			for (var i = 0; i < response.visits.overallfeedback.length; i++) {

				if(response.visits.overallfeedback[i].id=== $rootScope.user._id)
				{
					if (response.visits.overallfeedback[i].feedbackElg == "true") {
						$scope.finalFeedback=true;
					} 
				}
			};
	});
});

app.controller('welcomeCtrl', ['$scope', 'location','$http','$routeParams','$rootScope','appService', function ($scope, location,$http,$routeParams,$rootScope,appService) {
	$scope.order = 0;
	$scope.group=$rootScope.user.groups;
	$scope.showContinue = true;
	$scope.medium = "medium";
	$scope.arrayData=[];
	$scope.customerName = $rootScope.user.name.first;

	var refresh = function() {
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
					$scope.user1 = response;
				})
				$scope.user_id1 = $scope.welcomeResponse[$scope.order].noteBy1;
				$http.get('/api/v1/secure/admin/users/' + $scope.user_id1,{
					cache: true
				}).success(function(response) {
					$scope.user2 = response;
				})
				$scope.user_id2 = $scope.welcomeResponse[$scope.order].noteBy2;
				$http.get('/api/v1/secure/admin/users/' + $scope.user_id2,{
					cache: true
				}).success(function(response) {
					$scope.user3 = response;
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


			appService.activeVisit().then(function(avisit){
				$http.get('/api/v1/secure/visits/'+avisit._id,{
					cache: true
				}).success(function(response) {
					console.log(response.client.name);
					$scope.clientName = response.client.name;
					$scope.clientLogo = response.client.logo;
				})
			});
		})
	}

	refresh();

	$scope.orderIncrement = function()
	{
		$scope.order = $scope.order + 1;
		$scope.user_id = $scope.welcomeResponse[$scope.order].noteBy;
		$http.get('/api/v1/secure/admin/users/' + $scope.user_id,{
			cache: true
		}).success(function(response) {
			$scope.user1 = response;
		})
		$scope.user_id1 = $scope.welcomeResponse[$scope.order].noteBy1;
		$http.get('/api/v1/secure/admin/users/' + $scope.user_id1,{
			cache: true
		}).success(function(response) {
			$scope.user2 = response;
		})
		$scope.user_id2 = $scope.welcomeResponse[$scope.order].noteBy2;
		$http.get('/api/v1/secure/admin/users/' + $scope.user_id2,{
			cache: true
		}).success(function(response) {
			$scope.user3 = response;
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

		$scope.user1 = '';
		$scope.user2 = '';
		$scope.user3 = '';
	}
}]);