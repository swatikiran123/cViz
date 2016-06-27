'use strict';

angular.module('mviz-main', [
	'appFilters','appService', 'home','locator','header','scroll','userViewDirective','richTextDirective'
	]);

angular.module('mviz-visits', [
	'appFilters','appService','visits','sessions','contacts','header','scroll','feedbackDirective','userViewDirective','execBios','client', 'overallFeedback','ngRateIt','ssnfbdir','richTextDirective'
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
				console.log(user.groups);
				if(visitStatus=='finalize' && (user.groups=='vManager'|| user.groups=='admin'||user.groups=='customer'||user.groups=='exec'))
				{
					defer.resolve(response.visits);
				}
				else if(visitStatus!='finalize' && (user.groups=='vManager'|| user.groups=='admin'))
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
