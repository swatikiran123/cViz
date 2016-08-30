
angular.module('facts', ['ngRoute','pdf'])

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

	.when('/main', {
    templateUrl: '/public/m/facts/main.html',
    controller: 'factsCtrl'
  })

  .when('/city/:name', {
    templateUrl: '/public/m/city/city.html',
    controller: 'cityCtrl'
  })	

  .when('/qFacts', {
    templateUrl: '/public/m/facts/segments/qFacts.html',
    controller: 'factsCtrl'
  })	

  .when('/indiaLocs', {
    templateUrl: '/public/m/facts/segments/indiaLocs.html',
    controller: 'factsCtrl'
  })  

  .when('/rewards', {
    templateUrl: '/public/m/facts/segments/certs.html',
    controller: 'factsCtrl'
  })  

	// if none of the above states are matched, use this as the fallback
  $routeProvider.otherwise('/main');

}]);
