angular.module('contacts')

.controller('contactsCtrl', function($scope, $routeParams, $http) {

	$scope.nameonly= "nameonly";
	$scope.small= "small";
	$scope.large= "LARGE";
	$scope.medium= "medium";
	$http.get('/api/v1/secure/contactList/city/' + $routeParams.city).success(function(response) {
		$scope.contactList = response;

	})
});
