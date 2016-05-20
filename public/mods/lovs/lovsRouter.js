'use strict';

angular.module('lovs')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      .when('/lovs/', {
        templateUrl: '/public/mods/lovs/lovsViewAdd.html',
        controller: 'lovsControllerMain'
      })
      .when('/lovs/details/', {
        templateUrl: '/public/mods/lovs/vManView.html',
        controller: 'lovsControllerMain'
      })
    }
  ]);
