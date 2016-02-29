'use strict';

angular.module('facts')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/f/', {
        templateUrl: '/public/mods/facts/factsViewMain.html',
        controller: 'factsControllerMain'
      })

      .when('/add', {
        templateUrl: '/public/mods/facts/factsViewAdd.html',
        controller: 'factsControllerMain'
      })

      .when('/:id/show', {
        templateUrl: '/public/mods/facts/factsViewShow.html',
        controller: 'factsControllerMain'
      })

      .when('/:id/edit', {
        templateUrl: '/public/mods/facts/factsViewAdd.html',
        controller: 'factsControllerMain'
      });


    }
  ]);
