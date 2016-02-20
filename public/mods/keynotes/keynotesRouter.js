'use strict';

angular.module('keynotes')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/', {
        templateUrl: '/public/mods/keynotes/keynotesViewMain.html',
        controller: 'keynotesControllerMain'
      })

      .when('/add', {
        templateUrl: '/public/mods/keynotes/keynotesViewAdd.html',
        controller: 'keynotesControllerMain'
      })

    }
  ]);
