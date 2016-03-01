'use strict';
console.log('am in controller1');

var schedulerApp = angular.module('scheduler',[]);

console.log('am in controller2');

schedulerApp.controller('schedulerController', ['$scope', 
  function($scope) { 


  	$scope.tagline = 'To the moon and back!'
    }]);

/*angular.module('scheduler', [])
.controller('schedulerController', ['$scope', function ($scope) {
  $scope.tagline = 'To the moon and back!'
}]) 
*/
/*

var schedulerApp = angular.module('scheduler');

schedulerApp.controller('schedulerController', ['$scope', 
  function($scope) { 
console.log('am in controller1');

  	$scope.tagline = 'To the moon and back!'
}]);*/