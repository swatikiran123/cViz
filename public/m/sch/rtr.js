'use strict';

angular.module('schedules')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/', {
        templateUrl: '/public/m/sch/all.html',
        controller: 'schCntr'
      })

      .when('/:id/show', {
        templateUrl: '/public/m/sch/sngl.html',
        controller: 'schCntr'
      })

    }
  ]);
