angular.module('visits', [])

.controller('visitsCtrl', function($scope, $http) {
	$http.get('/api/v1/secure/visits').success(function(response) {
		$scope.visitList = response;
	});
})

.controller('visitCtrl', function($scope, $routeParams, $http) {
	$http.get('/api/v1/secure/visits/' + $routeParams.id).success(function(response) {
		$scope.visit = response;
	});
});
