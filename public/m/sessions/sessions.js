
angular.module('sessions', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

	.when('/sessions/:id', {
		templateUrl: '/public/m/sessions/sessions.html',
		controller: 'sessionsCtrl'
	})

	.when('/agenda', {
		templateUrl: '/public/m/dummy.html',
		controller: 'agendaCtrl'
	})

	.when('/sessions/:id/details', {
		templateUrl: '/public/m/sessions/session.html',
		controller: 'sessionCtrl'
	})

	.when('/sessionDetails', {
		templateUrl: '/public/m/sessions/sessionDetails.html',
		controller: 'sessionDetailsCtrl'
	})

	.when("/sessionFeedback/:fTmpl/:sId/:vId", {
		templateUrl: '/public/m/sessions/sessionFeedback.html',
		controller: "sessionFeedbackCtrl"
	})


}]);
