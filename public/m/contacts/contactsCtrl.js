angular.module('contacts')

.controller('contactsCtrl', function($scope, $routeParams, $http) {
	$scope.nameonly= "nameonly";
	$http.get('/api/v1/secure/contactList/city/').success(function(response) {//add location here after /city/
		$scope.contactList = response;

	})
});
