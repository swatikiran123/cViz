
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

// .run(function ($rootScope, $location) {
//
// 	var history = [];
//
// 	$rootScope.$on('$routeChangeSuccess', function() {
//
// 		if($location.$$path != "/"){
// 			if(history.indexOf($location.$$path) < 0){
// 				history.push($location.$$path);
// 			}
// 		}
// 	});
//
// 	$rootScope.canBack = function(){
// 		return (history.length > 1);
// 	};
//
// 	$rootScope.back = function () {
// 			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
// 			$location.path(prevUrl);
// 	};
//
// })

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
