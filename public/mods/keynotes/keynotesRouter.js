'use strict';

angular.module('keynotes')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      .when('/keynotes/list', {
        templateUrl: '/public/mods/keynotes/keynotesViewMain.html',
        controller: 'keynotesControllerMain'
      })

      .when('/keynotes/add', {
        templateUrl: '/public/mods/keynotes/keynotesViewAdd.html',
        controller: 'keynotesControllerMain'
      })

      .when('/keynotes/:id/show', {
        templateUrl: '/public/mods/keynotes/keynotesViewShow.html',
        controller: 'keynotesControllerMain'
      })

      .when('/keynotes/:id/edit', {
        templateUrl: '/public/mods/keynotes/keynotesViewAdd.html',
        controller: 'keynotesControllerMain'
      })

      .when('/keynotes/panelsview', {
        templateUrl: '/public/mods/keynotes/keynotesViewPanels.html',
        controller: 'keynotesControllerMain'
      });


    }
  ]);
