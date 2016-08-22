'use strict';

angular.module('cviz-admin', ['users','confirmDialogDirective','tooltips','appUserService']);

angular.module('cviz-customize',
	['userprofileDirective','userDirective','userdisplayDirective',
	'appFilters',
	'datePicker',
	'keynotes','facts','feedback','teasers','lovs', 'confirmDialogDirective','contactList','richTextDirective','ngRateIt','feedbackDirective','dropzone','meetingPlaces', 'tooltips','angucomplete','userAutoDirective','angucomplete-alt','angucomplete-alter','appUserService']);

angular.module('cviz-manage',
	['userprofileDirective','userDirective','userdisplayDirective', 'clientDisplayDirective', 'inviteesDirective',
	'appFilters',
	'datePicker','fileuploadDirective',
	'visits',"clients",'confirmDialogDirective','richTextDirective','ngRateIt','tooltips','dropzone','angucomplete','userAutoDirective','angucomplete-alt','angucomplete-alter','appUserService']);

angular.module('cviz-profile',
	['userprofileDirective','userDirective','userdisplayDirective',
	'appFilters',
	'datePicker','dropzone','fileuploadDirective',
	'profile','userAutoDirective','appUserService']);

var serv = angular.module('appUserService', []);

serv.factory('appUserService', ['$http', '$q', function ($http, $q){

	 var appUserService =  {};

	 appUserService.activeUser = function () {

			 var defer = $q.defer();

			 $http.get('/token',{
				 cache: true
			 }).success(function(response) {
			 	  
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

	 return appUserService;

 }]);

// var serv = angular.module('appService', []);

// serv.factory('appService', ['$http', '$q', function ($http, $q){

// 	 var appService =  {};

// 	 appService.activeVisit = function () {

// 			 var defer = $q.defer();

// 			 $http.get('/api/v1/secure/visits/all/activeVisit',{
// 				 cache: true
// 			 }).success(function(response) {
// 				 if(response.visits !== undefined){
// 					 defer.resolve(response.visits);
// 				 }
// 				 else {
//  					 //console.log("Not active visit");
// 					 defer.reject("Not active visit");
// 				 }
// 			 });

// 			 return defer.promise;
// 	 }

// 	 return appService;

//  }]);
