angular.module('visits')

.controller('visitsCtrl', function($scope, $http) {
	console.log("Visits controller running");
	$http.get('/api/v1/secure/visits').success(function(response) {
		console.log(response);
		$scope.visitBunches = response["last-week"];
		console.log($scope.visitBunches);
	});
})

.controller('visitCtrl', function($scope, $routeParams, $http) {
	$http.get('/api/v1/secure/visits/' + $routeParams.id).success(function(response) {
		$scope.visit = response;
	});
})
 .controller('myVisitsCtrl', function($scope, $rootScope, $location, $http) {
      $http.get('/api/v1/secure/visits').success(function(response) {
        $scope.visitList = response;
				console.log(response);
    });

        $scope.visit_details = [{
        }];


        $scope.IsVisible = false;
        $scope.IsActionVisible = false;

        $scope.showSortDropDown = function() {
            console.log("Inside showSortDropDown");
            $scope.IsVisible = $scope.IsVisible ? false : true;
            $scope.IsActionVisible = false;
           // if ($scope.IsVisible) {
           //      angular.element('#my-visits-container .searchView  .sort-by-wrapper').css('border', '1px solid #dddddd');
           //      angular.element('#my-visits-container .searchView  .sort-by-wrapper').css('border-bottom', 'none');
           //      // angular.element('#my-visits-container .searchView  .sort-by-wrapper').css('box-shadow', '2px 0px 2px #9a9a9a');
           //      angular.element('#my-visits-container .searchView  .sort-by-wrapper').css('box-shadow', 'none');
           //  } else {
           //      angular.element('#my-visits-container .searchView  .sort-by-wrapper').css('border', '1px solid #fff');
           //      angular.element('#my-visits-container .searchView  .sort-by-wrapper').css('border-bottom', 'none');
           //      angular.element('#my-visits-container .searchView  .sort-by-wrapper').css('box-shadow', 'none');
           //  }*/
        };


        $scope.showActionDropDown = function() {
            $scope.IsActionVisible = $scope.IsActionVisible ? false : true;
        };


    });
