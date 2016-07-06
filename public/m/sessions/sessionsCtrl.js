angular.module('sessions')

.controller('sessionsCtrl', function($scope, $routeParams, $http, $route, $location, $anchorScroll, $timeout ,$window,$rootScope, appServicem) {
		appServicem.activeVisit($routeParams.id).then(function(avisit){
	 $scope.activevists = true;
  if(avisit == 'Not active visit'){
    $scope.activevists =false;
    $scope.message == "No active visits available in the database Please contact the Visit Portal Admin"
  };
	

	$scope.group=$rootScope.user.groups;
	$scope.current = new Date();

	$scope.mix=[];
	$scope.invitee=[];
	var refresh = function() {
		$http.get('/api/v1/secure/visits/' + avisit._id + '/sessions',{
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
		$http.get('/api/v1/secure/visits/' + avisit._id ,{
		//cache: true
	}).success(function(response) {
		$scope.visittitle = response;
		$scope.visittitles = $scope.visittitle.client.name;
	})
	console.log('refresh');

};

refresh();

	$scope.calculation = function(rtime) {

		if(rtime < 0 || rtime > 0)
		{
			$scope.isEnable = true;
		}
		else {
			$scope.isEnable = false;
		}
	}

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
			//console.log(response);
			$scope.response = response;
			$scope.response.status = "cancelled";

			$scope.st = moment($scope.response.session.startTime);
			$scope.et = moment($scope.response.session.endTime);

			var difference = moment.duration($scope.st.diff($scope.et));
			var diffInMin = difference.asMinutes();
			console.log(diffInMin);

			$scope.pushSession(sessionId,diffInMin);

			$http.put('/api/v1/secure/visitSchedules/' + sessionId,  $scope.response).success(function(response) {
				//console.log(response);

				if ($scope.response.status === "cancelled"){
					angular.element('#cancel-session').addClass('agenda-cancel-session');
				}	
				refresh();
			});

			$http.put('/api/v1/secure/visitSchedules/'+ sessionId, $scope.response).success(function(response1) {
				console.log(response1);
				refresh();
			});
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

  //$scope.visit_id = $routeParams.id;
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
	})

.controller('sessionCtrl', function($scope, $routeParams, $http, $rootScope,$interval,$window,toaster,$timeout) {
	$scope.arrayData=[];
	$scope.comment = [];
	$scope.comment11 = [];
	$scope.myData = [];
	console.log($rootScope.user);
	$scope.refresh1 = function()
	{ 
    // console.log($scope.visitid);

    $http.get('/api/v1/secure/visitSchedules/'+$routeParams.id).success(function(response)
    {
    	$scope.comment = response.comments;
      // console.log($scope.comment);

      for(var i=0;i<$scope.comment.length;i++)
      {
      	$scope.myData.push($scope.comment[i]._id);
      }
  });
}

// refresh1();

var refresh2 = function()
{ 
	$http.get('/api/v1/secure/visitSchedules/'+$routeParams.id).success(function(response)
	{
		$scope.comment = response.comments;
	});
}

// $interval(function(){
// 	$http.get('/api/v1/secure/visitSchedules/'+$routeParams.id).success(function(response)
// 	{
// 		$scope.comment = response.comments;
// 	});
// },1000);

	$http.get('/api/v1/secure/visitSchedules/' + $routeParams.id,{
		cache: true
	}).success(function(response) {
		$scope.session = response;
		console.log(JSON.stringify($scope.session,null,2));
		$scope.owner= $scope.session.session.owner;
		$scope.supporter =$scope.session.session.supporter;
		// console.log($scope.session.session.owner);
		// console.log($scope.owner);
		if($scope.owner!=null)
		{
		$scope.arrayData.push($scope.owner);
		}
	});
	// $scope.visitDataId = $routeParams.id;
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


$scope.btn_add = function(comment1) {

  if(comment1 !=''){
    $scope.comment11.push({
      comment: comment1,
      givenBy: $rootScope.user._id
    });

    $http.post('/api/v1/secure/comments/',$scope.comment11).success(function(response) {
      // console.log(response);
      $scope.commentid = response._id;
      $scope.myData.push($scope.commentid);
    });
    // refresh1();

    $http.get('/api/v1/secure/visitSchedules/' + $routeParams.id).success(function(response)
    {
      $scope.visitSchedule = response;
      var inData = $scope.visitSchedule;
      inData.comments = $scope.myData;
      console.log($scope.myData)
      $scope.commentsData = [];
      console.log(inData);
      $http.put('/api/v1/secure/visitSchedules/'+$routeParams.id,inData).success(function(response) {

      	// refresh2();
        $http.get('/api/v1/secure/visitSchedules/'+$routeParams.id).success(function(response)
        {
          console.log(response)	;
          $scope.comment = response.comments;
          console.log($scope.comment);
          $scope.oneData = [];
          for(var i=0;i<$scope.comment.length;i++)
          {
            $scope.oneData.push($scope.comment[i]._id);
            $scope.commentsData = $scope.oneData;
          }
        }).then(function() {
          console.log($scope.commentsData);
          toaster.pop({body:"Your Note has been received."});
          $timeout(callSubmit,3000);
        });

      });

    })

$scope.txtcomment = "";
$scope.comment11 = [];
}
}

function callSubmit() {
	window.location.reload();
};


})

/*.controller('agendaCtrl', function($rootScope, $routeParams, $location, appServicem) {
	appServicem.activeVisit($routeParams.id).then(function(avisit){
		$location.path("sessions/" + avisit._id);
	})
})*/

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
