
angular.module('contacts', ['ngRoute'])

.run(function ($rootScope, $location, $http) {
	$http.get('/token')
		.success(function (user, status) {
		if (user) {
			$rootScope.user = user;
		}
    else {
			// user not found, ask to login
    }
	});
})

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

	.when('/contacts', {
		templateUrl: '/public/m/contacts/contacts.html',
		controller: 'contactsCtrl'
	})
}]);
