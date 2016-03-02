'use strict';

angular.module('feedback')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/addFeedback', {
        templateUrl: '/public/mods/feedback/feedbackViewAdd.html',
        controller: 'feedbackControllerMain'
      })

      .when('/fback/', {
        templateUrl: '/public/mods/feedback/feedbackViewMain.html',
        controller: 'feedbackControllerMain'
      })

      .when('/:id/showFeedback', {
        templateUrl: '/public/mods/feedback/feedbackViewShow.html',
        controller: 'feedbackControllerMain'
      })

      .when('/:id/editFeedback', {
        templateUrl: '/public/mods/feedback/feedbackViewAdd.html',
        controller: 'feedbackControllerMain'
      });
    }
  ]);
