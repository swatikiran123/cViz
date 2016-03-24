

angular.module('userDirective', [])
.controller('userDirectiveControllerMain', ['$scope', '$http', function($scope, $http) {

  if($scope.userModel === undefined || $scope.userModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "user";

  $scope.getUser = function(){
    var url= "";
    if($scope.userId!="" && $scope.userId!=undefined){
      // $scope.showFlag = "none";
      // return;
      url='/api/v1/secure/admin/users/' + $scope.userId;
    }
    else if ($scope.userEmail!="" && $scope.userEmail!=undefined) {
      url='/api/v1/secure/admin/users/email/' + $scope.userEmail;
    }
    else{
        message = "Invalid User Id/email";
        return;
    }


    $http.get(url).success(function(response) {
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
    templateUrl: '/public/d/user/templates/user-picker.html',
    scope: {
      userModel: "=userModel",
      userId: "=userId",
      userEmail: "=userEmail",
      viewType: "=viewType"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){

      var viewmode = scope.viewType.toLowerCase();

       if(viewmode === "small")
       {
        return "/public/d/user/templates/smallpanel.html";
      }
      if(viewmode === "large"){
        return "/public/d/user/templates/largepanel.html";
      }
      if(viewmode === "medium"){
        return "/public/d/user/templates/mediumpanel.html";
      }

    }
  }


};
});
