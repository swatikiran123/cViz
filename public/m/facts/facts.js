
angular.module('facts', ['ngRoute'])

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

  .when('/segments/qFacts', {
    templateUrl: '/public/m/facts/segments/qFacts.html',
    controller: 'factsCtrl'
  })	

  .when('/segments/indiaLocs', {
    templateUrl: '/public/m/facts/segments/indiaLocs.html',
    controller: 'factsCtrl'
  })  

  .when('/segments/certs', {
    templateUrl: '/public/m/facts/segments/certs.html',
    controller: 'factsCtrl'
  })  

	// if none of the above states are matched, use this as the fallback
  // $routeProvider.otherwise('/main');

}]);
