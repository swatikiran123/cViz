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

	$scope.myVisitsAll = {};
	
	$scope.setTimeline = function(time){
		$scope.timeline = time;
		console.log("setting timeline to " + $scope.timeline )

		if($scope.timeline == "past" || $scope.timeline == "today" || $scope.timeline == "further")
		{	
		$scope.visitBatch = $scope.allVisits[$scope.timeline];
		}
		if($scope.timeline == "all")
		{	
		$scope.allVisitsData = [];	
		for(var i=0;i<$scope.allVisits["past"].visits.length;i++)
		{
			$scope.allVisitsData.push($scope.allVisits["past"].visits[i]);
		}

		for(var k=0;k<$scope.allVisits["today"].visits.length;k++)
		{
			$scope.allVisitsData.push($scope.allVisits["today"].visits[k]);
		}

		for(var j=0;j<$scope.allVisits["further"].visits.length;j++)
		{
			$scope.allVisitsData.push($scope.allVisits["further"].visits[j]);
		}
		var uniqueIDs = [];
		var uniqueArray = [];

		for(var i = 0; i < $scope.allVisitsData.length; i++){

			if(uniqueIDs.indexOf($scope.allVisitsData[i]._id) === -1){
				uniqueArray.push($scope.allVisitsData[i])
				uniqueIDs.push($scope.allVisitsData[i]._id);
			}
		}
		$scope.myVisitsAll.start = $scope.allVisitsData[0].startDate;
		$scope.myVisitsAll.end = $scope.allVisitsData[$scope.allVisitsData.length - 1].endDate;
		$scope.myVisitsAll.visits = uniqueArray;
		$scope.visitBatch = $scope.myVisitsAll;
		}
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
	    $scope.allVisitsData = [];	
	    for(var i=0;i<$scope.allVisits["past"].visits.length;i++)
	    {
	    	$scope.allVisitsData.push($scope.allVisits["past"].visits[i]);
	    }

	    for(var k=0;k<$scope.allVisits["today"].visits.length;k++)
	    {
	    	$scope.allVisitsData.push($scope.allVisits["today"].visits[k]);
	    }

	    for(var j=0;j<$scope.allVisits["further"].visits.length;j++)
	    {
	    	$scope.allVisitsData.push($scope.allVisits["further"].visits[j]);
	    }
	    var uniqueIDs = [];
	    var uniqueArray = [];

	    for(var i = 0; i < $scope.allVisitsData.length; i++){

	    	if(uniqueIDs.indexOf($scope.allVisitsData[i]._id) === -1){
	    		uniqueArray.push($scope.allVisitsData[i])
	    		uniqueIDs.push($scope.allVisitsData[i]._id);
	    	}
	    }

	    $scope.allLength = uniqueArray.length;
			if($scope.timeline=="" || $scope.timeline===undefined){
				$scope.timeline = "today";
				$scope.visitBatch = $scope.allVisits[$scope.timeline];
				// $scope.pastVisitBatch = $scope.allVisits["past"];
				// $scope.futureVisitBatch = $scope.allVisits["further"];
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
