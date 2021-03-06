'use strict';


angular.module('mviz-visits', [
	'appFilters','appService','appServicem','visits','sessions','contacts','header','scroll','feedbackDirective','userViewDirective','execBios','client', 'overallFeedback','ngRateIt','ssnfbdir','richTextDirective','home','locator','appMUserService'
]);


angular.module('mviz-facts', [
	'ngMap',
	'appFilters',
	'facts','header','scroll'
	]);

angular.module('mviz-add', ['visitAdd','home','scroll','mgo-angular-wizard','header','scroll','userdisplayDirective','angucomplete-alt','angucomplete-alter']);

angular.module('mviz-emp', []);

var serv = angular.module('appService', []);

serv.factory('appService', ['$http', '$q', function ($http, $q){

	var appService =  {};

	appService.activeVisit = function () {


		var defer = $q.defer();

		$http.get('/api/v1/secure/visits/all/activeVisit',{
			cache: true
		}).success(function(response) {
			$http.get('/token').success(function (user, status) {

				var visitStatus = response.visits.status;
				
				if(response.visits !== undefined){
					console.log(visitStatus);
					console.log('this is null');
					console.log(user.groups);
					if(user.groups.includes("admin") === true){
						var group = "admin";
					}else
					if(user.groups.includes("vManager") === true){
						var  group = "vManager";
					}else if(user.groups.includes("exec") === true){
						var  group = "exec";
					}else if(user.groups.includes("user") === true){
						var  group = "user";
					}
										
					if(group=='vManager'|| group=='admin')
					{
						defer.resolve(response.visits);
					}
					else if(visitStatus =='finalize')
					{
						defer.resolve(response.visits);
					}
					else
					{
						defer.reject("Not active visit");
					}				
				}
				else {
 					 //console.log("Not active visit");
 					 defer.reject("Not active visit");
 					}
 				});

		});


		return defer.promise;
	}

	return appService;

}]);


var serv = angular.module('appServicem', []);

serv.factory('appServicem', ['$http', '$q', function ($http, $q){

	var appServicem =  {};

	appServicem.activeVisit = function (id) {
		var defer = $q.defer();
		console.log(id);
		if(id == undefined){ 
		console.log(' this is null');
		$http.get('/api/v1/secure/visits/all/activeVisit',{
			cache: true
		}).success(function(response) {
			$http.get('/token').success(function (user, status) {

				var visitStatus = response.visits.status;
				
				if(response.visits !== undefined){
					console.log(visitStatus);
					console.log(user.groups);
					if(user.groups.includes("admin") === true){
						var group = "admin";
					}else
					if(user.groups.includes("vManager") === true){
						var  group = "vManager";
					}else if(user.groups.includes("exec") === true){
						var  group = "exec";
					}else if(user.groups.includes("user") === true){
						var  group = "user";
					}
					
					
					if(group=='vManager'|| group=='admin' || group=='user')
					{
						defer.resolve(response.visits);
					}
					else if(visitStatus =='finalize')
					{
						defer.resolve(response.visits);
					}
					else
					{
						defer.reject("Not active visit");
					}
				}
				else {
 					 //console.log("Not active visit");
 					 defer.reject("Not active visit");
 					}
 				});

		});

	}

	else {
		console.log('this is id');
		$http.get('/api/v1/secure/visits/'+ id,{
			cache: true
		}).success(function(response) {
			console.log(response);
			$http.get('/token').success(function (user, status) {
             console.log(response);
             console.log(status);
             var visitStatus = response.status;
             
             if(response !== undefined){
             	console.log(visitStatus);
             	console.log(user.groups);
             	if(user.groups.includes("admin") === true){
						var group = "admin";
					}else
					if(user.groups.includes("vManager") === true){
						var  group = "vManager";
					}else if(user.groups.includes("exec") === true){
						var  group = "exec";
					}else if(user.groups.includes("user") === true){
						var  group = "user";
					}
					
					
             	if(group=='vManager'|| group=='admin' || group=='user')
             	{
             		defer.resolve(response);
             	}
             	else if(visitStatus=='finalize')
             	{
             		defer.resolve(response);
             	}
             	else
             	{
             		defer.reject("Not active visit");
             	}
             }
             else {
 					 //console.log("Not active visit");
 					 defer.reject("Not active visit");
 					}
 				});

		});
	}


	return defer.promise;
}

return appServicem;

}]);

var serv1 = angular.module('appMUserService', []);

serv1.factory('appMUserService', ['$http', '$q', function ($http, $q){

	var appMUserService =  {};

	appMUserService.activeMUser = function () {

		var defer = $q.defer();

		$http.get('/token',{
			cache: true
		}).success(function(response) {
			console.log(response);
			if(response !== undefined){
				defer.resolve(response);
			}
			else {
 					 //console.log("Not active visit");
 					 defer.reject("No User Found");
 					}
 				});

		return defer.promise;
	}

	return appMUserService;

}]);
