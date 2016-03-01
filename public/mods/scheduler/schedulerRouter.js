'use strict';

angular.module('scheduler')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/s/', {
        templateUrl: '/public/mods/scheduler/schedulerView.html',
        controller: 'schedulerController'
      });

    }
  ]);
