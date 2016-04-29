angular.module('visits')

.controller('visitsCtrl', function($scope, $http) {
	console.log("All visits controller running");
	$http.get('/api/v1/secure/visits',{
		cache: true
	}).success(function(response) {
		//console.log(response);
		$scope.visitList = response;
		//console.log($scope.visitBunches);
	});
})

.controller('visitCtrl', function($scope, $routeParams, $http) {
	console.log("single visit controller running")
	$http.get('/api/v1/secure/visits/' + $routeParams.id,{
		cache: true
	}).success(function(response) {
		$scope.visit = response;
	});
})

.controller('myVisitsCtrl', function($scope, $rootScope, $location, $http) {
	$scope.setTimeline = function(time){
		$scope.timeline = time;
		console.log("setting timeline to " + $scope.timeline )
		$scope.visitBatch = $scope.allVisits[$scope.timeline];
	}
	  $scope.getSession = function(item1){
	  	console.log('helow'+item1);
	  	console.log('helow'+item1.type);
	  	 if(item1.type === "Visit"){
            $location.path("/sessions/" +item1.id);}
         else{
            $location.path("sessions/" +item1.id+"/details");
    }
  }


  $http.get('/api/v1/secure/visits/all/my',{
		cache: true
	}).success(function(response) {
	    $scope.allVisits = response;
			if($scope.timeline=="" || $scope.timeline===undefined){
				$scope.timeline = "this-week";
				$scope.visitBatch = $scope.allVisits[$scope.timeline];
			}
		}
	)


})
.controller('execvistCtrl', function($scope,$location) {


        $scope.goBack = function () {
            $location.path("/visits/all/my");
        };
        $scope.goToAgenda = function(){
           // $location.path("/sessions/" +.id);
        };
    });
