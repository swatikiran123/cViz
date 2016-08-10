angular.module('sessions')

.controller('sessionsCtrl', function($scope, $routeParams, $http, $route, $location, $anchorScroll, $timeout ,$window,$rootScope, appServicem,appMUserService) {
	appMUserService.activeMUser().then(function(user){
    $scope.activeUser = user;
		  $scope.visittitles = 'No active visit';
	$scope.pusharray = [];
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
	$scope.finalData=[[]];
	var refresh = function() {
		$http.get('/api/v1/secure/visits/' + avisit._id + '/sessions',{
		}).success(function(response) {
			$scope.scheduleList = response;
			for (var i = 0; i < $scope.scheduleList.length; i++) {
				for (var l = 0; l < $scope.scheduleList[i].sessions.length; l++) {
					if ($scope.scheduleList[i].sessions[l]!=undefined && $scope.scheduleList[i].sessions[l].invitees!=undefined) {
						var str= String($scope.scheduleList[i].sessions[l].feedbackElg);
						$scope.feedbackElg = str.split(/[ ,]+/);
						for (var j = 0; j < $scope.scheduleList[i].sessions[l].invitees.length; j++) {
							$scope.invitee.push($scope.scheduleList[i].sessions[l].invitees[j]);
						}
						for (var k = 0; k < $scope.invitee.length; k++) {
							if ($scope.feedbackElg[k]==""|| $scope.feedbackElg[k]== undefined || $scope.feedbackElg[k]== null) {
								$scope.feedbackElg[k]= false;
							}
							$scope.mix.push({
								invite: $scope.invitee[k],
								feedbackElg:$scope.feedbackElg[k]
							})
						}
					}
					for (var m = 0; m < $scope.mix.length; m++) {
						if ($scope.activeUser._id === $scope.mix[m].invite) {
							if ($scope.mix[m].feedbackElg==""|| $scope.mix[m].feedbackElg== undefined || $scope.mix[m].feedbackElg== null) {
								$scope.finalData[[i,l]] =false;
							}
							else
								$scope.finalData[[i,l]] =$scope.mix[m].feedbackElg;
						}
					}
					$scope.mix=[];
					$scope.invitee=[];
					// console.log($scope.finalData)
				}
			}
		});
		$http.get('/api/v1/secure/visits/' + avisit._id ,{
		//cache: true
	}).success(function(response) {
		$scope.visittitle = response;
		$scope.visittitles = $scope.visittitle.client.name + ' Visit to CSC India';
	})

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


	$scope.submit = function(){

	   angular.forEach($scope.pusharray, function(todo) {
      if (!todo.done) 

		{console.log(todo.rtime);
			console.log(todo.id)
		    	$http.get('/api/v1/secure/visits/xyz/pushsession?sessionId='+ todo.id +'&time='+ todo.rtime +'&sesnstatus='+ todo.sesnstatus).success(function(response) {
			$scope.sessiontime = response;

			refresh();

   
		});

	}
    });

console.log($scope.pusharray);
$scope.pusharray = [];

	}

$scope.pushSession = function(sessionId,rtime,sesnstatus){

/*		$http.get('/api/v1/secure/visits/xyz/pushsession?sessionId='+ sessionId +'&time='+ rtime +'&sesnstatus='+ sesnstatus).success(function(response) {
			$scope.sessiontime = response;

			refresh();


		});*/
	
		$scope.pushobject = {};
 
		$scope.pushobject.id = sessionId;
		$scope.pushobject.rtime = rtime;
	    $scope.pushobject.sesnstatus = sesnstatus;
		
		$scope.pusharray.push($scope.pushobject)
		console.log($scope.pusharray);
	}


	$scope.drop = function(sessionId){
		$http.get('/api/v1/secure/visitSchedules/'+ sessionId).success(function(response)
		{
			$scope.response = response;
			$scope.response.status = "cancelled";

			$scope.st = moment($scope.response.session.startTime);
			$scope.et = moment($scope.response.session.endTime);

			var difference = moment.duration($scope.st.diff($scope.et));
			var diffInMin = difference.asMinutes();

			$scope.pushSession(sessionId,diffInMin,$scope.response.status);

			$http.put('/api/v1/secure/visitSchedules/' + sessionId,  $scope.response).success(function(response) {

				if ($scope.response.status === "cancelled"){
					angular.element('#cancel-session').addClass('agenda-cancel-session');
				}	
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

		$scope.hideFeeedbackDiv = true;
		$scope.toggleFeedbackDialog = function(index, $event){
			$scope.hideFeeedbackDiv = !$scope.hideFeeedbackDiv;
			$event.stopPropagation();
		};

		$scope.giveFeedback = function(fTmpl,sId,vId)
		{
			var path = "/sessionFeedback/" + (fTmpl || "") + "/" + (sId || "") + "/" + (vId || "");
			$window.location.reload();
			$location.path(path);
		}
		})
	})
	})


.controller('sessionCtrl', function($scope, $routeParams, $http, $rootScope,$interval,$window,toaster,$timeout,appMUserService) {
	appMUserService.activeMUser().then(function(user){

    $scope.activeUser = user;
    console.log($scope.activeUser);
	$scope.arrayData=[];
	$scope.comment = [];
	$scope.comment11 = [];
	$scope.myData = [];
	$scope.groupBelong = user.groups;
	$scope.refresh1 = function()
	{ 
    $scope.myData = [];
    $http.get('/api/v1/secure/visitSchedules/'+$routeParams.id).success(function(response)
    {
      $scope.comment = response.comments;
      for(var i=0;i<$scope.comment.length;i++)
      {
      	$scope.myData.push($scope.comment[i]._id);
      }
  });
}

var refresh2 = function()
{ 
	$http.get('/api/v1/secure/visitSchedules/'+$routeParams.id).success(function(response)
	{
		$scope.comment = response.comments;
	});
}

	$http.get('/api/v1/secure/visitSchedules/' + $routeParams.id,{
		cache: true
	}).success(function(response) {
		$scope.session = response;
		$scope.owner= $scope.session.session.owner;
		$scope.supporter =$scope.session.session.supporter;
		if($scope.owner!=null)
		{
		$scope.arrayData.push($scope.owner);
		}
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


$scope.btn_add = function(comment1) {

	$scope.myData = [];
	$scope.comment = [];
	$http.get('/api/v1/secure/visitSchedules/'+$routeParams.id).success(function(response)
	{
		$scope.comment = response.comments;

      for(var i=0;i<$scope.comment.length;i++)
      {
      	$scope.myData.push($scope.comment[i]._id);
      }
  }).then(function() {	
  if(comment1 !=''){
    $scope.comment11.push({
      comment: comment1,
      givenBy: $rootScope.user._id
    });

    $http.post('/api/v1/secure/comments/',$scope.comment11).success(function(response) {
      $scope.commentid = response._id;
      $scope.myData.push($scope.commentid);
    });

    $http.get('/api/v1/secure/visitSchedules/' + $routeParams.id).success(function(response)
    {
      $scope.visitSchedule = response;
      var inData = $scope.visitSchedule;
      inData.comments = $scope.myData;
      $scope.commentsData = [];
      $http.put('/api/v1/secure/visitSchedules/'+$routeParams.id,inData).success(function(response) {

        $http.get('/api/v1/secure/visitSchedules/'+$routeParams.id).success(function(response)
        {
          $scope.comment = response.comments;
          $scope.oneData = [];
          for(var i=0;i<$scope.comment.length;i++)
          {
            $scope.oneData.push($scope.comment[i]._id);
            $scope.commentsData = $scope.oneData;
          }
        }).then(function() {
          toaster.pop({body:"Note received."});
        });

      });

    })

$scope.txtcomment = "";
$scope.comment11 = [];
}
});
}

$scope.deleteComment = function(index){
	$scope.commentData = [];
	$scope.myData = [];
	$scope.comment.splice(index, 1);

	for(var i=0;i<$scope.comment.length;i++)
	{	
		$scope.commentData.push($scope.comment[i]._id);
		$scope.myData.push($scope.comment[i]._id);
	}

	$http.get('/api/v1/secure/visitSchedules/' + $routeParams.id).success(function(response)
	{	
		var inData = response;
		inData.comments = $scope.commentData;
		$http.put('/api/v1/secure/visitSchedules/'+$routeParams.id,inData).success(function(response) {
		});
	});
};

});
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
})

.controller('sessionsNotesCtrl', function($scope, $routeParams, $http, $route, $location, $anchorScroll, $timeout ,$window,$rootScope, appServicem) {
	appServicem.activeVisit($routeParams.id).then(function(avisit){
		$scope.activevists = true;
		if(avisit == 'Not active visit'){
			$scope.activevists =false;
			$scope.message == "No active visits available in the database Please contact the Visit Portal Admin"
		};

		var refresh = function() {
			$http.get('/api/v1/secure/visits/' + avisit._id + '/getallsessions',{
			}).success(function(response) {
				$scope.scheduleList = response;
			});
			$http.get('/api/v1/secure/visits/' + avisit._id ,{
		//cache: true
	}).success(function(response) {
		$scope.visittitle = response;
		$scope.visittitles = $scope.visittitle.client.name;
	})
};

refresh();
});
})