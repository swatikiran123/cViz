'use strict';

angular.module('csclctns')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider

		// home page
		.when('/', {
			templateUrl: '/public/mmod/csclctns/lctnView.html',
            controller: 'lctnCtrl'
		});

}]);