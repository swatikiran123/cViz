'use strict';

angular.module('facts')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/f/', {
        templateUrl: '/public/mods/facts/factsViewMain.html',
        controller: 'factsControllerMain'
      })

      .when('/addFact', {
        templateUrl: '/public/mods/facts/factsViewAdd.html',
        controller: 'factsControllerMain'
      })

      .when('/:id/showFact', {
        templateUrl: '/public/mods/facts/factsViewShow.html',
        controller: 'factsControllerMain'
      })

      .when('/:id/editFact', {
        templateUrl: '/public/mods/facts/factsViewAdd.html',
        controller: 'factsControllerMain'
      });


    }
  ]);
