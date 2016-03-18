'use strict';

angular.module('visits')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/v/', {
        templateUrl: '/public/mods/visits/visitsViewMain.html',
        controller: 'visitsControllerMain'
      })

      .when('/addVisit', {
        templateUrl: '/public/mods/visits/VisitsViewAdd.html',
        controller: 'visitsControllerMain'
      })

      .when('/:id/showVisit', {
        templateUrl: '/public/mods/visits/visitsViewShow.html',
        controller: 'visitsControllerMain'
      })

      .when('/:id/editSession', {
        templateUrl: '/public/mods/scheduler/schedulerView.html',
        controller: 'schedulerController'
      })

      .when('/session', {
        templateUrl: '/public/mods/scheduler/schedulerView.html',
        controller: 'schedulerController'
      })
      
      .when('/panelsVisitview', {
        templateUrl: '/public/mods/visits/partials/visitsViewPanels.html',
        controller: 'visitsControllerMain'
      })

      .when('/:id/editVisit', {
        templateUrl: '/public/mods/visits/VisitsViewAdd.html',
        controller: 'visitsControllerMain'
      });


    }
  ]);
