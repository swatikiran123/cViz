
angular.module('sessions', ['ngRoute'])

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

	.when('/visits/:id/agenda', {
    templateUrl: '/public/m/sessions/sessions.html',
    controller: 'sessionsCtrl'
  })

	.when('/sessions/:id', {
		templateUrl: '/public/m/sessions/sessions.html',
		controller: 'sessionsCtrl'
	})

	.when('/sessions/:id/details', {
		templateUrl: '/public/m/sessions/session.html',
		controller: 'sessionCtrl'
	})

}]);
