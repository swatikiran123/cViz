angular.module('userViewDirective', [])
.controller('userViewDirectiveControllerMain', ['$scope', '$http', function($scope, $http) {

  //console.log ($scope.userId);
  if($scope.userModel === undefined || $scope.userModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "user";

  $scope.getUser = function(){
    if($scope.userId===""){
      $scope.showFlag = "none";
      return;
    }

    $http.get('/api/v1/secure/admin/users/' + $scope.userId).success(function(response) {
      $scope.userModel = response;
      $scope.userId = response._id;
      $scope.showFlag = "user";
    })
    .error(function(response, status){
      $scope.showFlag = "noUser";
      if(status===404)
      {
        message = "User not found";
      }
      else
        console.log("error with userView directive");
    });
  }

}])

.directive('userview', function() {
  return {
    controller: 'userViewDirectiveControllerMain',
    templateUrl: '/public/d/userView/templates/userView.html',
    scope: {
      userId: "=userId",
      viewMode: "@viewMode"
    },

    link : function(scope,element,attrs)
    {
      //console.log(attrs.viewMode);
      scope.getTemplate = function()
      {
      var viewmode = attrs.viewMode;

      if(viewmode === "bullet-small"){
        return "/public/d/userView/templates/bulletSmall.html";
      }

    }
  }
};
});
