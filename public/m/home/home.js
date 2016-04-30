angular.module('home', ['ngRoute'])

.run(function ($rootScope, $location, $http) {
	$http.get('/token')
		.success(function (user, status) {
		if (user) {
			$rootScope.user = user;
		}
    else {
			// user not found, ask to login
    }

		$http.get('/api/v1/secure/visits/all/activeVisit',{
			cache: true
		}).success(function(response) {
			if(response.visits !== undefined){
				$rootScope.activeVisit = response.visits;
				console.log($rootScope.activeVisit);
			}
			else {
				console.log("Not active visit");
			}
		});

	});
})

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

	.when('/home',{
	  templateUrl: '/public/m/home/home.html',
	  controller: 'homeCtrl'
	})

	.when('/welcome', {
	  templateUrl: '/public/m/home/welcome.html',
	  controller: 'welcomeCtrl'
	})

	// if none of the above states are matched, use this as the fallback
  $routeProvider.otherwise('/home');

}]);
