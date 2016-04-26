angular.module('sessions')

.controller('sessionsCtrl', function($scope, $routeParams, $http, $location, $anchorScroll, $timeout ,$window) {
    $http.get('/api/v1/secure/visits/' + $routeParams.id + '/sessions').success(function(response) {
        $scope.scheduleList = response;
    });


console.log($location.search()["day"]);
console.log($location.search()["s"]);

    $scope.visit_id = $routeParams.id;
    $scope.vmtab = $location.search()["day"];
    if($scope.vmtab === undefined)
    {
			$scope.selectedIndex = 0;

				$scope.itemClicked = function ($index) {
					$scope.selectedIndex = $index;
				}
		}
	  else{
	  $scope.selectedIndex = $scope.vmtab-1;

	     $scope.itemClicked = function ($index) {
				 $scope.selectedIndex = $index;
			}
		}


		$scope.setTab = function(){
			if($location.search()["day"] === undefined)
				return 1;
			else
				return $location.search()["day"]-0;
		}


		// if ($location.hash() !== newHash) {
		// 	// set the $location.hash to `newHash` and
		// 	// $anchorScroll will automatically scroll to it
		// 	$location.hash(newHash);
		// } else {
		// 	// call $anchorScroll() explicitly,
		// 	// since $location.hash hasn't changed
		// 	$anchorScroll();
		// }

		$scope.hideFeeedbackDiv = true;
		$scope.toggleFeedbackDialog = function(index, $event){
			$scope.hideFeeedbackDiv = !$scope.hideFeeedbackDiv;
			$event.stopPropagation();
		};

		console.log("tab setting done");

		// var newHash = $location.search()["s"];
		// if ($location.hash() !== newHash) {
    //   // set the $location.hash to `newHash` and
    //   // $anchorScroll will automatically scroll to it
    //   $location.hash(newHash);
		// 	console.log("pushed");
    // } else {
    //   // call $anchorScroll() explicitly,
    //   // since $location.hash hasn't changed
    //   $anchorScroll();
    // }
		// console.log("hash set to " + newHash);

		$scope.giveFeedback = function(fTmpl,sId,vId)
		{
			var path = "/sessionFeedback/" + (fTmpl || "") + "/" + (sId || "") + "/" + (vId || "");
			$window.location.reload();
			$location.path(path);
		}
})

.controller('sessionCtrl', function($scope, $routeParams, $http) {
	$scope.arrayData=[];

	$http.get('/api/v1/secure/visitSchedules/' + $routeParams.id).success(function(response) {
		$scope.session = response;
		//console.log(JSON.stringify($scope.session,null,2));
		$scope.owner= $scope.session.session.owner;
		$scope.supporter =$scope.session.session.supporter;
		// console.log($scope.session.session.owner);
		// console.log($scope.owner);
		$scope.arrayData.push($scope.owner)


	});

        $scope.collapseDiv = function(index, text) {
            var ele = angular.element(document.getElementById(text + index));
            ele.toggle();
            var status = window.getComputedStyle(ele[0], null).getPropertyValue("display");
            if (status === "block") {
                ele.prev().addClass('chevron-down-arrow');
                ele.addClass('active');
            } else if (status === "none") {
                ele.prev().removeClass('chevron-down-arrow');
                ele.removeClass('active');
            }
        };


		$scope.hideFeeedbackDiv = true;
   	$scope.toggleFeedbackDialog = function(index, $event){
            $scope.hideFeeedbackDiv = !$scope.hideFeeedbackDiv;
            $event.stopPropagation();
        };
})

.controller('agendaCtrl', function($scope, $routeParams, $http, $location) {
    console.log("agenda controller running");
		$http.get('/api/v1/secure/visits/all/activeVisit').success(function(response) {
				//console.log("next visit id " + "#/sessions/" + response.visits._id));
				$location.path("sessions/" + response.visits._id);
		});
})


.controller('sessionFeedbackCtrl',function($scope, $routeParams, $http, $location, $timeout) {
	$scope.fbackTemp = $routeParams.fTmpl;
	$scope.sessionId = $routeParams.sId;
	$scope.visitId = $routeParams.vId;
});
