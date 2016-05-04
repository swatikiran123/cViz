var fb=angular.module('ssnfbdir', [])

fb.controller('ssnfbCtrl',function($scope, $routeParams, $http, $location, $timeout, $rootScope) {
  $scope.group=$rootScope.user.groups;
  console.log($scope.group);
});



fb.directive('ssnfbdir', function() {
  return {
    controller: 'ssnfbCtrl',
    templateUrl: '/public/d/ssnFeedbackDir/ssnfeedback.html',
    scope: {
      ftmplate: '@',
      visitId: '@',
      sessionId: '@'
    },

}

});