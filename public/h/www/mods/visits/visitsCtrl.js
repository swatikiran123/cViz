angular.module('visits', [])

.controller('visitsCtrl', function($scope, $ionicModal, $timeout, $http) {
	$http.get('/api/v1/secure/visits').success(function(response) {
		$scope.visitList = response;
	});
})

.controller('visitCtrl', function($scope, $stateParams, $http) {
	$http.get('/api/v1/secure/visits/' + $stateParams.id).success(function(response) {
		$scope.visit = response;
	});
});
