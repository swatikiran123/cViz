var app = angular.module('home');

app.controller('homeCtrl', function ($scope, location, $rootScope, $routeParams, $http, appService) {

	location.get(angular.noop, angular.noop);
	$scope.loading = true;
	$scope.finalFeedback=false;
	// $scope.current = new Date();
	// appService.activeVisit().then(function(avisit){
	// 	$http.get('/api/v1/secure/visits/'+avisit._id+'/getlasttimesessions',{
	// 		cache: true
	// 	}).success(function(response) {
	// 		$scope.lastSession = response[0];	
	// 	});
	// });

	appService.activeVisit().then(function(avisit){
		if(avisit==''||avisit==null||avisit==undefined)
		{
			$scope.button = 'disable';
		}
		if(avisit!=''||avisit!=null||avisit!=undefined)
		{
			$scope.button = 'enable';
		}
		$http.get('/api/v1/secure/visits/'+avisit._id+'/schedules',{
			cache: true
		}).success(function(response) {
			$scope.visitId = avisit._id;
			$scope.dayHighlighter = response;
			for(var i=0;i<$scope.dayHighlighter.length;i++)
			{	
				$scope.weatherData = [];
				$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.dayHighlighter[i].location + '&units=metric&APPID=73136fa514890c15bc4534e7b8a1c0c4',{
					cache: true
				}).success(function (data) {
					var climate = {};
					climate.daylike = data.weather[0].main;
					climate.temperature = data.main.temp + "\u00B0C";
					climate.icon = "/public/assets/m/img/ic/"+ data.weather[0].icon +".png";
					$scope.weatherData.push(climate);
				});
			}
			$scope.loading = false;
		})
	}, function(reason) {
		$scope.loading = false;
	})

	$http.get('/api/v1/secure/visits/all/activeVisit',{
		cache: true
	}).success(function(response) {
		$scope.endDate = response.visits.endDate;
			for (var i = 0; i < response.visits.overallfeedback.length; i++) {

				if(response.visits.overallfeedback[i].id=== $rootScope.user._id)
				{
					if (response.visits.overallfeedback[i].feedbackElg == "true") {
						$scope.finalFeedback=true;
					} 
				}
			};
	});
});

app.controller('welcomeCtrl', ['$scope', 'location','$http','$routeParams','$rootScope','appService', function ($scope, location,$http,$routeParams,$rootScope,appService) {
	$scope.order = 0;
	$scope.group=$rootScope.user.groups;
	$scope.showContinue = true;
	$scope.medium = "medium";
	$scope.arrayData=[];
	$scope.customerName = $rootScope.user.name.first;
	    $scope.previewoption = ' ';
   
    var refresh = function() {
    	appService.activeVisit().then(function(avisitData){
    		if(avisitData==''||avisitData==null||avisitData==undefined)
    		{
    			angular.element('#videoModal').modal('hide');
    		}
    		if(avisitData!=''||avisitData!=null||avisitData!=undefined)
    		{
    			angular.element('#videoModal').modal('show');
    		}
    	});
		$http.get('/api/v1/secure/visits/current/keynotes',{
			cache: true
		}).success(function(response) {
			if(response[0] != "")
			{
				$scope.welcomeResponse = response[0];
				$scope.length = $scope.welcomeResponse.length - 1;
				$scope.user_id = $scope.welcomeResponse[$scope.order].noteBy;
				$http.get('/api/v1/secure/admin/users/' + $scope.user_id,{
					cache: true
				}).success(function(response) {
					$scope.user1 = response;
				})
				$scope.user_id1 = $scope.welcomeResponse[$scope.order].noteBy1;
				$http.get('/api/v1/secure/admin/users/' + $scope.user_id1,{
					cache: true
				}).success(function(response) {
					$scope.user2 = response;
				})
				$scope.user_id2 = $scope.welcomeResponse[$scope.order].noteBy2;
				$http.get('/api/v1/secure/admin/users/' + $scope.user_id2,{
					cache: true
				}).success(function(response) {
					$scope.user3 = response;
				})
				if(response[0].length == 1)
				{
					$scope.showContinue = false;
				}
			}

			else
			{
				console.log("No keynotes Defined");
			}


			appService.activeVisit().then(function(avisit){
				$http.get('/api/v1/secure/visits/'+avisit._id,{
					cache: true
				}).success(function(response) {
					console.log(response.client.name);
					$scope.clientName = response.client.name;
					$scope.clientLogo = response.client.logo;
				})
			});
		})
	}

	refresh();


	    appService.activeVisit().then(function(avist){
$scope.vid = avist._id;
});
	   $scope.preview = function(previewoption) {
	   	$scope.myData1= [];
	   	$scope.keynotes1 =[];
	   	console.log(previewoption);
	    $http.get('/api/v1/secure/visits/' + $scope.vid).success(function(response)
 		{
 			console.log(response);
 		// $scope.response = response;
 						response.preview = previewoption;

 						console.log(response.preview);
 						$scope.visits = response;
								var inData = $scope.visits;
								console.log(inData);
								inData.client=$scope.visits.client._id;
								inData.createBy = $scope.visits.createBy._id;
								if(inData.cscPersonnel.salesExec != null || inData.cscPersonnel.salesExec != undefined)
								{
									inData.cscPersonnel.salesExec = $scope.visits.cscPersonnel.salesExec._id;
								}

								if(inData.cscPersonnel.salesExec == null || inData.cscPersonnel.salesExec == undefined)
								{
									inData.cscPersonnel.salesExec = null;
								}

								if(inData.cscPersonnel.accountGM != null || inData.cscPersonnel.accountGM != undefined)
								{
									inData.cscPersonnel.accountGM = $scope.visits.cscPersonnel.accountGM._id;
								}

								if(inData.cscPersonnel.accountGM == null || inData.cscPersonnel.accountGM == undefined)
								{
									inData.cscPersonnel.accountGM = null;
								}

								if(inData.cscPersonnel.industryExec != null || inData.cscPersonnel.industryExec != undefined)
								{
									inData.cscPersonnel.industryExec = $scope.visits.cscPersonnel.industryExec._id;
								}

								if(inData.cscPersonnel.industryExec == null || inData.cscPersonnel.industryExec == undefined)
								{
									inData.cscPersonnel.industryExec = null;
								}

								if(inData.cscPersonnel.globalDelivery != null || inData.cscPersonnel.globalDelivery != undefined)
								{
									inData.cscPersonnel.globalDelivery = $scope.visits.cscPersonnel.globalDelivery._id;
								}

								if(inData.cscPersonnel.globalDelivery == null || inData.cscPersonnel.globalDelivery == undefined)
								{
									inData.cscPersonnel.globalDelivery = null;
								}

								if(inData.cscPersonnel.cre != null || inData.cscPersonnel.cre != undefined)
								{
									inData.cscPersonnel.cre = $scope.visits.cscPersonnel.cre._id;
								} 

								if(inData.cscPersonnel.cre == null || inData.cscPersonnel.cre == undefined)
								{
									inData.cscPersonnel.cre = null;
								}

								if(inData.anchor!=null || inData.anchor != undefined)
								{
									inData.anchor = $scope.visits.anchor._id;
								}

								if(inData.anchor==null || inData.anchor == undefined)
								{
									inData.anchor = null;
								}

								if(inData.secondaryVmanager!=null || inData.secondaryVmanager!=undefined)
								{
									inData.secondaryVmanager = $scope.visits.secondaryVmanager._id;
								}

								if(inData.secondaryVmanager==null || inData.secondaryVmanager==undefined)
								{
									inData.secondaryVmanager = null;
								}

								if(inData.feedbackTmpl!=null || inData.feedbackTmpl!=undefined)
								{
									inData.feedbackTmpl = $scope.visits.feedbackTmpl._id;
								}  

								if(inData.feedbackTmpl==null || inData.feedbackTmpl==undefined)
								{
									inData.feedbackTmpl = null;
								}  

								if(inData.sessionTmpl!=null || inData.sessionTmpl!=undefined)
								{
									inData.sessionTmpl = $scope.visits.sessionTmpl._id;;
								}  

								if(inData.sessionTmpl==null || inData.sessionTmpl==undefined)
								{
									inData.sessionTmpl = null;
								}  
								for (var i =0; i<$scope.visits.keynote.length;i++) {
									$scope.keynotes1.push({
										note: $scope.visits.keynote[i].note._id,
										noteName: $scope.visits.keynote[i].note.title, 
										context: $scope.visits.keynote[i].context,
										order: $scope.visits.keynote[i].order
									});
								};
								if($scope.comment!=null)
								{
									for(var i=0;i<$scope.comment.length;i++)
									{
										$scope.myData1.push($scope.comment[i]._id);
									}
									inData.comments = $scope.myData;
								}
								inData.keynote = $scope.keynotes;						
								inData.overallfeedback = $scope.visits.overallfeedback; 

 			
      $http.put('/api/v1/secure/visits/' + $scope.vid,  inData).success(function(response1) { 

console.log(response1);

      });
	
 	});
	};

	$scope.orderIncrement = function()
	{
		$scope.order = $scope.order + 1;
		$scope.user_id = $scope.welcomeResponse[$scope.order].noteBy;
		$http.get('/api/v1/secure/admin/users/' + $scope.user_id,{
			cache: true
		}).success(function(response) {
			$scope.user1 = response;
		})
		$scope.user_id1 = $scope.welcomeResponse[$scope.order].noteBy1;
		$http.get('/api/v1/secure/admin/users/' + $scope.user_id1,{
			cache: true
		}).success(function(response) {
			$scope.user2 = response;
		})
		$scope.user_id2 = $scope.welcomeResponse[$scope.order].noteBy2;
		$http.get('/api/v1/secure/admin/users/' + $scope.user_id2,{
			cache: true
		}).success(function(response) {
			$scope.user3 = response;
		})
		if($scope.order == $scope.length)
		{
			$scope.showContinue = false;
			// $scope.order = 0;
		}

		if($scope.order < $scope.length)
		{
			$scope.showContinue = true;
		}

		$scope.user1 = '';
		$scope.user2 = '';
		$scope.user3 = '';
	}
}]);