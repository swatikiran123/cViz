
myApp.controller("footerController", ['$scope', '$http',
  function($scope, $http) {

  var refresh = function() {
    $http.get('/api/v1/app/info').success(function(response) {
      $scope.appInfo = response;
			console.log($scope.appInfo);
    }
  )};

  refresh();
}])
