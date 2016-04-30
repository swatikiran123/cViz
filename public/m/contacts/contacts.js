
angular.module('contacts', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

	.when('/contacts/:city', {
		templateUrl: '/public/m/contacts/contacts.html',
		controller: 'contactsCtrl'
	})

    .when('/contacts', {
		templateUrl: '/public/m/dummy.html',
		controller: 'spocCtrl'
	})


}]);
