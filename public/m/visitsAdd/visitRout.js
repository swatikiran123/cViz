angular.module('visitAdd')

.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
	.when('/add',{
		templateUrl: '/public/m/visitsAdd/visitAdd.html',
		controller: 'visitsControllerMain'
	})
	.when('/visits/:id/edit',{
		templateUrl: '/public/m/visitsAdd/visitAdd.html',
		controller: 'visitsControllerMain'
	})
}]);