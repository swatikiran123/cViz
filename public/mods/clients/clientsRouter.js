'use strict';

angular.module('clients')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/c/', {
        templateUrl: '/public/mods/clients/clientsViewMain.html',
        controller: 'clientsControllerMain'
      })

/*      .when('/add', {
        templateUrl: '/public/mods/keynotes/keynotesViewAdd.html',
        controller: 'keynotesControllerMain'
      })

      .when('/:id/show', {
        templateUrl: '/public/mods/keynotes/keynotesViewShow.html',
        controller: 'keynotesControllerMain'
      })

      .when('/:id/edit', {
        templateUrl: '/public/mods/keynotes/keynotesViewAdd.html',
        controller: 'keynotesControllerMain'
      });
*/

    }
  ]);
