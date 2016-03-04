

angular.module('userdisplayDirective', [])
.controller('userdisplayDirectiveControllerMain', ['$scope', '$http', function($scope, $http) {

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
        console.log("error with user directive");
    });
  }

}])

.directive('userdisplay', function() {
  return {
    controller: 'userdisplayDirectiveControllerMain',
    templateUrl: '/public/mods/directives/userdisplay/templates/userdisplay.html',
    scope: {      
      userId: "=userId",      
      viewMode: "=viewMode"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){
      
      var viewmode = scope.viewMode.toLowerCase();

      if(viewmode === "nameonly"){
        return "/public/mods/directives/userdisplay/templates/nameOnlyPanel.html";
      }

      if(viewmode === "summaryonly"){
        return "/public/mods/directives/userdisplay/templates/summaryOnlyPanel.html";
      }

      if(viewmode === "bulletsmallonly"){
        return "/public/mods/directives/userdisplay/templates/bulletSmallOnlyPanel.html";
      }

      if(viewmode === "bulletmediumonly"){
        return "/public/mods/directives/userdisplay/templates/bulletMediumOnlyPanel.html";
      }

      if(viewmode === "emailonly"){
        return "/public/mods/directives/userdisplay/templates/emailOnlyPanel.html";
      }

      if(viewmode === "small")
      {
        return "/public/mods/directives/userdisplay/templates/smallpanel.html";
      }

      if(viewmode === "large")
      {
        return "/public/mods/directives/userdisplay/templates/largepanel.html";
      }

      if(viewmode === "medium")
      {
        return "/public/mods/directives/userdisplay/templates/mediumpanel.html";
      }
    }
  }
};
});
