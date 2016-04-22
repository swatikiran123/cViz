
angular.module('visits', ['ngRoute'])

.run(function ($rootScope, $location, $http) {
	$http.get('/token')
		.success(function (user, status) {
		if (user) {
			$rootScope.user = user;
			console.log($rootScope.user);
		}
    else {
			// user not found, ask to login
    }
	});
})

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/visits', {
    templateUrl: '/public/m/visits/visits.html',
    controller: 'visitsCtrl'
  })

	.when('/visits/:id', {
		templateUrl: '/public/m/visits/visit.html',
		controller: 'visitCtrl'
	})
	.when('/visitSessions/:id/details', {
		templateUrl: '/public/m/sessions/session.html',
		controller: 'sessionCtrl'
	})
	.when('/execvisits', {
		templateUrl: '/public/m/visits/execVisit.html',
		controller: 'execvistCtrl'
	})
   .when('/visits/all/my', {
		templateUrl: '/public/m/visits/myVisits.html',
		controller: 'myVisitsCtrl'
	});
	// if none of the above states are matched, use this as the fallback
  $routeProvider.otherwise('/visits/all/my');

}]);
