angular.module('sessions')

.controller('sessionsCtrl', function($scope, $routeParams, $http, $route, $location, $anchorScroll, $timeout ,$window,$rootScope) {
	$scope.group=$rootScope.user.groups;
	$scope.current = new Date();

	$scope.mix=[];
	$scope.invitee=[];
	var refresh = function() {
		$http.get('/api/v1/secure/visits/' + $routeParams.id + '/sessions',{
		}).success(function(response) {
			$scope.scheduleList = response;
			for (var i = 0; i < $scope.scheduleList.length; i++) {
				if ($scope.scheduleList[i].sessions[i]!=undefined && $scope.scheduleList[i].sessions[i].invitees[i]!=undefined) {
					var str= String($scope.scheduleList[i].sessions[i].feedbackElg);
					$scope.feedbackElg = str.split(/[ ,]+/);
					for (var j = 0; j < $scope.scheduleList[i].sessions[i].invitees.length; j++) {

						$scope.invitee.push($scope.scheduleList[i].sessions[i].invitees[j]);
					}
					for (var i = 0; i < $scope.feedbackElg.length; i++) {
						$scope.mix.push({
							invite: $scope.invitee[i],
							feedbackElg:$scope.feedbackElg[i]
						})
					}
				}
			}
			$scope.finalData=false;
			for (var i = 0; i < $scope.mix.length; i++) {
				if ($rootScope.user._id === $scope.mix[i].invite) {
					$scope.finalData =$scope.mix[i].feedbackElg;
				}
			};
		});
		$http.get('/api/v1/secure/visits/' + $routeParams.id ,{
		//cache: true
	}).success(function(response) {
		$scope.visittitle = response;
		$scope.visittitles = $scope.visittitle.title;
	})
	console.log('refresh');

};

refresh();

$scope.pushSession = function(sessionId,rtime){
		//console.log(sessionId)
		//$window.location.reload();
		console.log(sessionId);
		console.log(rtime);

		$http.get('/api/v1/secure/visits/xyz/pushsession?sessionId='+ sessionId +'&time='+ rtime).success(function(response) {
			$scope.sessiontime = response;

			refresh();

		});
	}
	$scope.drop = function(sessionId){
		$http.get('/api/v1/secure/visitSchedules/'+ sessionId).success(function(response)
		{
			console.log(response);
			$scope.response = response;
			$console.log($scope.response);
			$scope.response.status = "cancelled";
			$console.log($scope.response.status);

            // $scope.status = "cancelled";
            // console.log(sessionId);console.log(status);
            $http.put('/api/v1/secure/visitSchedules/' + sessionId,  $scope.response).success(function(response) {
            	console.log(response);

            });
            if ($scope.response.status === "cancelled"){
            	angular.element('#cancel-session').addClass('agenda-cancel-session');
            	console.log('hellow')
            }

        });


	}


	$scope.getClass = function (strValue) {
		if (strValue == ("cancelled"))
			return "agenda-block-sub-div-cancel";
		else{
			return "agenda-block-sub-div";}
		}

		$scope.getdiv = function (strValue) {
			if (strValue == ("cancelled"))
				return "feed";
			else{
				return "feedback-link";}
			}
  //  console.log($location.search()["day"]);
  //  console.log($location.search()["s"]);

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

		// console.log("tab setting done");

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

.controller('sessionCtrl', function($scope, $routeParams, $http, $rootScope) {
	$scope.arrayData=[];
	console.log($rootScope.user);
	$http.get('/api/v1/secure/visitSchedules/' + $routeParams.id,{
		cache: true
	}).success(function(response) {
		$scope.session = response;
		console.log(JSON.stringify($scope.session,null,2));
		$scope.owner= $scope.session.session.owner;
		$scope.supporter =$scope.session.session.supporter;
		// console.log($scope.session.session.owner);
		// console.log($scope.owner);
		$scope.arrayData.push($scope.owner);
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

.controller('agendaCtrl', function($rootScope, $location, appService) {
	appService.activeVisit().then(function(avisit){
		$location.path("sessions/" + avisit._id);
	})
})

.controller('sessionFeedbackCtrl',function($scope, $routeParams, $http, $location, $timeout) {
	$scope.fbackTemp = $routeParams.fTmpl;
	$scope.sessionId = $routeParams.sId;
	$scope.visitId = $routeParams.vId;
	$scope.feedbackId = $routeParams.fId;
	$http.get('/api/v1/secure/visitSchedules/' + $scope.sessionId,{
		cache: true
	}).success(function(response){
		$scope.sessionTitle = response.session.title;
	});
});
