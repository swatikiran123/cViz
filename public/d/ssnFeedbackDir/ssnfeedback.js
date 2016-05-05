var fb=angular.module('ssnfbdir', [])

fb.controller('ssnfbCtrl',function($scope, $routeParams, $http, $location, $timeout, $rootScope) {
  $scope.group=$rootScope.user.groups;
  console.log($scope.group);
  $scope.current = new Date();
  console.log( $scope.current);

    $scope.getfeedback = function (strValue) {
                    if (strValue == ("cancelled"))
                        return "cancel";
                    else{
                  return "feedback-link";}
                };
  /*$scope.settime = function(starttime){
  if (starttime <= $scope.current){
    $scope.stime = "less";
  }else{  $scope.stime = "more";}

}*/
});





fb.directive('ssnfbdir', function() {
  return {
    controller: 'ssnfbCtrl',
    templateUrl: '/public/d/ssnFeedbackDir/ssnfeedback.html',
    scope: {
      ftmplate: '@',
      visitId: '@',
      sessionId: '@',
      status: '@',
      type: '@',
      starttime:'@'
    },

}

});