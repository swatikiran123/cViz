'use strict';

angular.module('meetingPlaces')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/meetingPlaces/list', {
        templateUrl: '/public/mods/meetingPlaces/meetingPlacesViewMain.html',
        controller: 'meetingPlacesControllerMain'
      })

      .when('/meetingPlaces/panels', {
        templateUrl: '/public/mods/meetingPlaces/partials/meetingPlacesViewPanels.html',
        controller: 'meetingPlacesControllerMain'
      });
    }
  ]);
