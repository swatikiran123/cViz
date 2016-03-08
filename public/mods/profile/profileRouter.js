'use strict';

angular.module('profile')
  .config(['$routeProvider', function ($routeProvider,req, res) {
    $routeProvider
      
      .when('/p/', {
        templateUrl: '/public/mods/profile/profileViewMain.html',
        controller: 'profileControllerMain'
      })
    }
  ]);
