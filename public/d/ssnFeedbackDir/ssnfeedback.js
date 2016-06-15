var fb=angular.module('ssnfbdir', [])

fb.controller('ssnfbCtrl',function($scope, $routeParams, $http,$filter, $location, $timeout, $rootScope) {
  $scope.group=$rootScope.user.groups;
  $scope.current = new Date();

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

  $http.get('/api/v1/secure/feedbacks/').success(function(response) {
    $scope.feedbackSamplelist = $filter('filter')(response, {visitid:$scope.visitId, sessionid: $scope.sessionId, feedbackOn: "session",providedBy:$rootScope.user._id });
    console.log($scope.feedbackSamplelist);
  });
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
      starttime:'@',
      feedbackElg: '@'
    },

}

});