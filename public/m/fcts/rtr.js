'use strict';

angular.module('facts')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/', {
        templateUrl: '/public/m/fcts/main.html',
        controller: 'factCntr'
      })

      .when('/mstone', {
        templateUrl: '/public/m/fcts/mstone.html',
        controller: 'factCntr'
      })

    }
  ]);
