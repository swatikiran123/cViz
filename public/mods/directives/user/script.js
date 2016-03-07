

angular.module('userDirective', [])
.controller('userDirectiveControllerMain', ['$scope', '$http', function($scope, $http) {

console.log($scope.userModel);
console.log($scope.userEmail);

  if($scope.userModel === undefined || $scope.userModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "user";

  $scope.getUser = function(){
    if($scope.userEmail===""){
      $scope.showFlag = "none";
      return;
    }

    $http.get('/api/v1/secure/admin/users/email/' + $scope.userEmail).success(function(response) {
      $scope.userModel = response;
      $scope.userId = response._id;
      $scope.userEmail = response.email;

      $scope.showFlag = "user";
    })
    .error(function(response, status){
      $scope.showFlag = "noUser";
      if(status===404)
      {
        message = "User not found";
      }
      else
        console.log("error with user directive");
    });
  }

}])

.directive('user', function() {
  return {
    controller: 'userDirectiveControllerMain',
    templateUrl: '/public/mods/directives/user/templates/user-picker.html',
    scope: {
      userModel: "=userModel",
      userId: "=userId",
      userEmail: "=userEmail"
    }
  };
});
