
angular.module('contacts', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

	.when('/contacts/:city', {
		templateUrl: '/public/m/contacts/contacts.html',
		controller: 'contactsCtrl'
	})

     .when('/contactanchor/:id', {
		templateUrl: '/public/m/contacts/contacts.html',
		controller: 'contactsCtrl'
	})
    
    
    .when('/contacts/', {
		templateUrl: '/public/m/contacts/contacts.html',
		controller: 'contactsCtrl'
	})
    



}]);
