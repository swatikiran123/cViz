'use strict';

angular.module('teasers')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      .when('/teasers/list', {
        templateUrl: '/public/mods/teasers/teasersViewMain.html',
        controller: 'teasersControllerMain'
      })

      .when('/teasers/add', {
        templateUrl: '/public/mods/teasers/teasersViewAdd.html',
        controller: 'teasersControllerMain'
      })

      .when('/teasers/:id/edit', {
        templateUrl: '/public/mods/teasers/teasersViewAdd.html',
        controller: 'teasersControllerMain'
      })

      .when('/teasers/panels', {
        templateUrl: '/public/mods/teasers/partials/teasersPanel.html',
        controller: 'teasersControllerMain'
      });
    }
  ]);
