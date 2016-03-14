


angular.module('cViz-m', ['ngRoute', 'ngAnimate', 'appMain', 'visits', 'sessions', 'generic', 'factCtrl'])


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

.run(function ($rootScope, $location) {

	var history = [];

	$rootScope.$on('$routeChangeSuccess', function() {
		if($location.$$path != "/")
			history.push($location.$$path);
	});

	$rootScope.canBack = function(){
		return (history.lenth > 1);
	};

	$rootScope.back = function () {
			var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
			$location.path(prevUrl);
	};

})

.controller('ctrl', function($scope, $rootScope){
	  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
			$rootScope.animation = currRoute.animation;
	  });


	})

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/home', {
    templateUrl: 'mods/home/home.html',
    controller: 'genericCtrl',
		animation: 'first'
  })

  .when('/visits', {
    templateUrl: 'mods/visits/visits.html',
    controller: 'visitsCtrl',
		animation: 'second'
  })

  .when('/visits/:id', {
    templateUrl: 'mods/visits/visit.html',
    controller: 'visitCtrl',
		animation: 'second'
  })

  .when('/session/:id', {
    templateUrl: 'mods/sessions/sessions.html',
    controller: 'sessionsCtrl',
		animation: 'second'
  })

  .when('/sessions/:id', {
    templateUrl: 'mods/sessions/session.html',
    controller: 'sessionCtrl',
		animation: 'second'
  })

  .when('/facts', {
    templateUrl: 'mods/facts/facts.html',
    controller: 'factCtrl',
		animation: 'second'
  })

  .when('/contacts', {
        templateUrl: 'mods/contacts/main.html',
        controller: 'genericCtrl',
				animation: 'second'
  })

  .when('/city', {
        templateUrl: 'mods/city/main.html',
        controller: 'genericCtrl',
				animation: 'second'
  })

  .when('/feedback', {
        templateUrl: 'mods/sessions/feedback.html',
        controller: 'genericCtrl',
				animation: 'second'
  })

  .when('/search', {
        templateUrl: 'mods/search.html',
				animation: 'second'
  })

  // if none of the above states are matched, use this as the fallback
  $routeProvider.otherwise('/home');
}]);
