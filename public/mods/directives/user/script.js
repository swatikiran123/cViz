

angular.module('userDirective', [])
.controller('userDirectiveControllerMain', ['$scope', '$http', function($scope, $http) {
  $scope.data = {
    input: '',
    id: '',
    user: {},
    output:''
    //found:'false'
  };

//$scope.showUser = false;
  $scope.showFlag = "none";

  $scope.getUser = function(){
    //console.log($scope.data.input);

    $http.get('/api/v1/admin/users/' + $scope.data.input).success(function(response) {
      //console.log(response);
      $scope.data.user = response;
      //$scope.data.found = 'true';

      $scope.showFlag = "user";
/*      $scope.data.output = parse("%s %s, <%s>", $scope.data.user.name.first, 
        $scope.data.user.name.last, $scope.data.user.email);*/
      //console.log($scope.data);
    })
    .error(function(response, status){
/*      console.log(response.status);
      console.log(status);*/
      //$scope.showUser = false;
      $scope.showFlag = "noUser";
      if(status===404)
      {
        //console.log("User not found");
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
    templateUrl: '/public/mods/directives/user/templates/user-picker.html'
  };
});

