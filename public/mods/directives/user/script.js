

angular.module('userDirective', [])
.controller('userDirectiveControllerMain', ['$scope', '$http', function($scope, $http) {
  $scope.data = {
    input: '',
    id: '',
    user: {},
    output:'',
    found:'false'
  };

//var $scope.show=false;

  $scope.getUser = function(){
    console.log($scope.data.input);

    $http.get('/api/v1/admin/users/' + $scope.data.input).success(function(response) {
      console.log(response);
      $scope.data.user = response;
      $scope.data.found = 'true';
$scope.show = true;
      $scope.data.output = parse("%s %s, <%s>", $scope.data.user.name.first, 
        $scope.data.user.name.last, $scope.data.user.email);
      console.log($scope.data);
    })
    .error(function(data, status){
      console.log("error with user directive");
    });
  }
  
}])

.directive('user', function() {
  return {
    controller: 'userDirectiveControllerMain',
/*    templateUrl: function(elem, attr){
      return 'user-'+attr.type+'.html';
    }*/
    templateUrl: '/public/mods/directives/user/templates/user-picker.html'
    //templateUrl: 'user-picker.html'
    //template: 'Name: {{user.name}} Address: {{user.address}}'
  };
});

