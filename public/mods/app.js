'use strict';

var adminModule = angular.module('cviz-admin', ['users','confirmDialogDirective','tooltips','appUserService']);

var customizeModule = angular.module('cviz-customize',
	['userprofileDirective','userDirective','userdisplayDirective',
	'appFilters',
	'datePicker',
	'keynotes','facts','feedback','teasers','lovs', 'confirmDialogDirective','contactList','richTextDirective','ngRateIt','feedbackDirective','dropzone','meetingPlaces', 'tooltips','angucomplete','userAutoDirective','angucomplete-alt','angucomplete-alter','appUserService']);

var manageModule = angular.module('cviz-manage',
	['userprofileDirective','userDirective','userdisplayDirective', 'clientDisplayDirective', 'inviteesDirective',
	'appFilters',
	'datePicker','fileuploadDirective',
	'visits',"clients",'confirmDialogDirective','richTextDirective','ngRateIt','tooltips','dropzone','angucomplete','userAutoDirective','angucomplete-alt','angucomplete-alter','appUserService']);

var profileModule = angular.module('cviz-profile',
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


adminModule.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
      	config.headers = config.headers || {};
      	if(config.data!=null)
      	{
      		if(config.data.jobTitle!=null)
      		{
      			var clean = htmlToPlaintext(config.data.jobTitle);
      			config.data.jobTitle = clean;
      		}

      		if(config.data.summary!=null)
      		{
      			var clean = htmlToPlaintext(config.data.summary);
      			config.data.summary = clean;
      		}

      		if(config.data.name!=null)
      		{	
      			if(config.data.name.first==null)
      			{	
      			var clean = htmlToPlaintext(config.data.name);
      			config.data.name = clean;
      			}
      		}

      		if(config.data.description!=null)
      		{
      			var clean = htmlToPlaintext(config.data.description);
      			config.data.description = clean;
      		}
      	}
      	config.headers['X-XSS-Protection'] = '1; mode=block';
      	return config;
      }
  };
  });
});

customizeModule.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
      	config.headers = config.headers || {};
      	if(config.data!=null)
      	{
      	if(config.data.values!=null)
      	{		
      	var length = config.data.values.length;
      	var dirty = config.data.values[length-1];
      	var clean = htmlToPlaintext(dirty);
      	config.data.values[length-1] = clean; 
      	}

		if(config.data.title!=null)
		{
			var clean = htmlToPlaintext(config.data.title);
			config.data.title = clean;	
		}  

		if(config.data.desc!=null)
		{
			var clean = htmlToPlaintext(config.data.desc);
			config.data.desc = clean;	
		}  

		if(config.data.meetingPlace!=null)
		{
			var clean = htmlToPlaintext(config.data.meetingPlace);
			config.data.meetingPlace = clean;	
		}  

      	}
      	config.headers['X-XSS-Protection'] = '1; mode=block';
      	// console.log(config)
      	return config;
      }
  };
  });
});

manageModule.config(function($httpProvider) {
  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if(config.data!=null)
        {
          if(config.data.name!=null)
          {
            if(config.data.name.first==null)
            { 
              var clean = htmlToPlaintext(config.data.name);
              config.data.name = clean;
            }
            
          }

          if(config.data.subName!=null)
          {
            var clean = htmlToPlaintext(config.data.subName);
            config.data.subName = clean;            
          }

          if(config.data.sfdcid!=null)
          {
            var clean = htmlToPlaintext(config.data.sfdcid);
            config.data.sfdcid = clean; 
          }

          if(config.data.netPromoter!=null)
          {
            var clean = htmlToPlaintext(config.data.netPromoter);
            config.data.netPromoter = clean; 
          }

          if(config.data.competitors!=null)
          {
            var clean = htmlToPlaintext(config.data.competitors);
            config.data.competitors = clean; 
          }

          if(config.data.wbsCode!=null)
          {
            var clean = htmlToPlaintext(config.data.wbsCode);
            config.data.wbsCode = clean;             
          }

          if(config.data.chargeCode!=null)
          {
            var clean = htmlToPlaintext(config.data.chargeCode);
            config.data.chargeCode = clean; 
          }

          if(config.data.session!=null)
          {
          if(config.data.session.title!=null)
          {
             var clean = htmlToPlaintext(config.data.session.title);
             config.data.session.title = clean; 
          }
        }
        }
        config.headers['X-XSS-Protection'] = '1; mode=block';
        return config;
      }
  };
  });
});

function htmlToPlaintext(text) {
  console.log(text);
  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
}
