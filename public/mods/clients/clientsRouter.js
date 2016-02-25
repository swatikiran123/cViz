'use strict';

angular.module('clients')
.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/c/', {
    templateUrl: '/public/mods/clients/clientsViewMain.html',
    controller: 'clientsControllerMain'
  })

  .when('/addAccount', {
    templateUrl: '/public/mods/clients/clientsViewAdd.html',
    controller: 'clientsControllerMain'
  })

  .when('/:id/showClient', {
    templateUrl: '/public/mods/clients/clientsViewShow.html',
    controller: 'clientsControllerMain'
  })

  .when('/:id/editClient', {
    templateUrl: '/public/mods/clients/clientsViewAdd.html',
    controller: 'clientsControllerMain'
  });

}
]);
