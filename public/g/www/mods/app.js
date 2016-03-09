
angular.module('cViz-m', ['ngRoute', 'appMain', 'visits', 'sessions', 'generic'])

.run(function ($rootScope, $location, $http) {
	$http.get('/token')
		.success(function (user, status) {
		if (user) {
			$rootScope.user = user;
      console.log($rootScope.user);
		}
    else {
      console.log("no user");
    }
	});
})

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/home', {
    templateUrl: 'mods/home/home.html',
    controller: 'genericCtrl'
  })

  .when('/visits', {
    templateUrl: 'mods/visits/visits.html',
    controller: 'visitsCtrl'
  })

  .when('/visits/:id', {
    templateUrl: 'mods/visits/visit.html',
    controller: 'visitCtrl'
  })

  .when('/sessions', {
    templateUrl: 'mods/sessions/sessions.html',
    controller: 'sessionsCtrl'
  })

  .when('/sessions/:id', {
    templateUrl: 'mods/sessions/session.html',
    controller: 'sessionCtrl'
  })

  .when('/facts', {
    templateUrl: 'mods/factsheet/facts.html',
    controller: 'genericCtrl'
  })

  .when('/contacts', {
        templateUrl: 'mods/contacts/main.html',
        controller: 'genericCtrl'
  })

  .when('/city', {
        templateUrl: 'mods/city/main.html',
        controller: 'genericCtrl'
  })

  .when('/feedback', {
        templateUrl: 'mods/sessions/feedback.html',
        controller: 'genericCtrl'
  })

  .when('/search', {
        templateUrl: 'mods/search.html'
  })

  // if none of the above states are matched, use this as the fallback
  $routeProvider.otherwise('/home');
}]);
