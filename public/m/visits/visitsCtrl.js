angular.module('visits')

.controller('visitsCtrl', function($scope, $http) {
	console.log("All visits controller running");
	$http.get('/api/v1/secure/visits').success(function(response) {
		console.log(response);
		$scope.visitBunches = response["last-week"];
		console.log($scope.visitBunches);
	});
})

.controller('visitCtrl', function($scope, $routeParams, $http) {
	console.log("single visit controller running")
	$http.get('/api/v1/secure/visits/' + $routeParams.id).success(function(response) {
		$scope.visit = response;
	});
})

.controller('myVisitsCtrl', function($scope, $rootScope, $location, $http) {
	console.log("my visits controller running...")

	$scope.setTimeline = function(time){
		$scope.timeline = time;
		console.log("setting timeline to " + $scope.timeline )
		$scope.visitBatch = $scope.allVisits[$scope.timeline];
	}

  $http.get('/api/v1/secure/visits/all/my').success(function(response) {
	    $scope.allVisits = response;
			if($scope.timeline=="" || $scope.timeline===undefined){
				$scope.timeline = "this-week";
				console.log("no timeline. Set to " + $scope.timeline);
				$scope.visitBatch = $scope.allVisits[$scope.timeline];
			}

			console.log($scope.visitBatch);
		}
	);
})
