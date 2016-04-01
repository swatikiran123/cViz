angular.module('clientDisplayDirective', [])
.controller('clientdisplayDirectiveControllerMain', ['$scope', '$http', function($scope, $http) {

  if($scope.clientModel === undefined || $scope.clientModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "client";

  $scope.getClient = function(){
    if($scope.clientId===""){
      $scope.showFlag = "none";
      return;
    }

    $http.get('/api/v1/secure/clients/id/' + $scope.clientId).success(function(response) {
      $scope.clientModel = response;
      //console.log(response);
      $scope.clientId = response._id;
      $scope.showFlag = "client";
    })
    .error(function(response, status){
      $scope.showFlag = "noClient";
      if(status===404)
      {
        message = "Client not found";
      }
      else
        console.log("error with client directive");
    });
  }

}])

.directive('clientdisplay', function() {
  return {
    controller: 'clientdisplayDirectiveControllerMain',
    templateUrl: '/public/d/clientDisplay/templates/clientdisplay.html',
    scope: {
      clientId: "=clientId",
      viewMode: "=viewMode"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){

      var viewmode = scope.viewMode.toLowerCase();

      if(viewmode === "clientnameonly"){
        return "/public/d/clientDisplay/templates/clientNameOnlyPanel.html";
      }

      if(viewmode === "clientsmallpanel")
      {
        return "/public/d/clientDisplay/templates/clientSmallPanel.html";
      }

      if(viewmode === "clientlargepanel")
      {
        return "/public/d/clientDisplay/templates/clientLargePanel.html";
      }

      if(viewmode === "clientmediumpanel")
      {
        return "/public/d/clientDisplay/templates/clientMediumPanel.html";
      }
    }
  }
};
});
