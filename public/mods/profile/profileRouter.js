'use strict';

angular.module('profile')
  .config(['$routeProvider', function ($routeProvider,req, res) {
    $routeProvider

      .when('/me', {
        templateUrl: '/public/mods/profile/profileViewMain.html',
        controller: 'profileControllerMain'
      })

      .when('/:id/show', {
        templateUrl: '/public/mods/profile/profileViewEdit.html',
        controller: 'profilebyIdControllerMain'
      })

			.otherwise({
				redirect: '/me'
			})
    }

  ]);
