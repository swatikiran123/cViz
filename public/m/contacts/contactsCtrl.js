angular.module('contacts')

.controller('contactsCtrl', function($scope, $routeParams, $http) {

	$scope.nameonly= "nameonly";
	$scope.small= "small";
	$scope.large= "LARGE";
	$scope.medium= "medium";
	$http.get('/api/v1/secure/contactList/city/' + $routeParams.city).success(function(response) {
		$scope.contactList = response;

	})
})
  .controller('spocCtrl', function($scope) {
        $scope.spoc_details = [{
            'picture': '/public/assets/g/imgs/avatar.jpg',
            'name': 'Mr Vincent Chase',
            'designation': 'Sr Analyst, CSC, Bangalore',
            'bio': 'Met my aggressive timeline requirement with very good quality. Worked with me to come up with a viable solution to meet the timeline. Easy to work with and have the customers best interest in mind. You can find less expensive alternatives but the quality and responsiveness is well worth the price',
            'email': 'vincent@csc.com',
            'telephone': [
                '+555 555 5555',
                '+91 923 823 0982'
            ]
        }];
    });
