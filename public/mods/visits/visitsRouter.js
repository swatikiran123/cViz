'use strict';

angular.module('visits')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      .when('/visits/list', {
        templateUrl: '/public/mods/visits/visitsViewMain.html',
        controller: 'visitsControllerMain'
      })

			.when('/visits/panels', {
        templateUrl: '/public/mods/visits/partials/visitsViewPanels.html',
        controller: 'visitsControllerMain'
      })

      .when('/visits/add', {
        templateUrl: '/public/mods/visits/visitsViewAdd.html',
        controller: 'visitsControllerMain'
      })

			.when('/visits/:id/edit', {
        templateUrl: '/public/mods/visits/visitsViewAdd.html',
        controller: 'visitsControllerMain'
      })

      .when('/visits/:id/show', {
        templateUrl: '/public/mods/visits/visitsViewShow.html',
        controller: 'visitsControllerMain'
      })

			.when('/visits/:id/sessions', {
				templateUrl: '/public/mods/visits/sessions/sessionsViewMain.html',
				controller: 'sessionsControllerMain'
			})
      .when('/visits/calendar', {
        templateUrl: '/public/mods/visits/calendar.html',
        controller: 'calendarCtrl'
      })
			.otherwise({
				redirectTo: '/visits/list'
			})

    }
  ]);
