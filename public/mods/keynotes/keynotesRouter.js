'use strict';

angular.module('keynotes')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/k/', {
        templateUrl: '/public/mods/keynotes/keynotesViewMain.html',
        controller: 'keynotesControllerMain'
      })

      .when('/add', {
        templateUrl: '/public/mods/keynotes/keynotesViewAdd.html',
        controller: 'keynotesControllerMain'
      })

      .when('/:id/show1', {
        templateUrl: '/public/mods/keynotes/keynotesViewShow.html',
        controller: 'keynotesControllerMain'
      })

      .when('/:id/edit', {
        templateUrl: '/public/mods/keynotes/keynotesViewAdd.html',
        controller: 'keynotesControllerMain'
      })

      .when('/panelsview', {
        templateUrl: '/public/mods/keynotes/keynotesViewPanels.html',
        controller: 'keynotesControllerMain'
      });


    }
  ]);
