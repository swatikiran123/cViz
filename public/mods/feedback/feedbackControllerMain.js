'use strict';

var feedbackApp = angular.module('feedback');

feedbackApp.controller('feedbackControllerMain', ['$scope', '$http', '$routeParams','$location', 'growl','$rootScope',
	function($scope, $http, $routeParams, $location,growl,$rootScope) {	
  console.log('feedback controller');
 	$scope.items=[];
 	var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');

  var refresh = function() {

    $http.get('/api/v1/secure/feedbackDefs').success(function(response) {
      console.log(response);
      $scope.feedbackList = response;
      $scope.feedbackDefs = "";
      $scope.items=[];
            
      switch($scope.mode)    {
        case "add":
          $scope.feedbackDefs = "";
          break;

        case "edit":
          $scope.feedbackDefs = $http.get('/api/v1/secure/feedbackDefs/' + id).success(function(response){
            var feedbackDefs = response;
            $scope.items = feedbackDefs.item;       //list of item            
            $scope.feedbackDefs = feedbackDefs;     //whole form object
            console.log($scope.items);          
          });

      } // switch scope.mode ends
    }); // get feedback call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    //$scope.feedbackDefs.createBy = $rootScope.user._id;    
    switch($scope.mode)    {
      case "add":
        $scope.create();
        break;

      case "edit":
        $scope.update();
        break;
      } // end of switch scope.mode ends

      $location.path("/");
  } // end of save method


  $scope.create = function() {
    
    console.log($scope.items);
   // $scope.feedbackDefs.createBy = $rootScope.user._id;
    var inData = $scope.feedbackDefs;
    inData.item = $scope.items;
    inData.createBy = $rootScope.user._id;
   	//inData.item.choices.value=$scope.items.value;
    console.log(inData);

    $http.post('/api/v1/secure/feedbackDefs', inData).success(function(response) {
      console.log(response);
      refresh();
      growl.info(parse("Feedback Definition [%s]<br/>Added successfully", inData.title));
    })
    .error(function(data, status){
      growl.error("Error adding Feedback Definition");
    }); // http post feedback ends
  }; // create method ends

  $scope.delete = function(feedback) {
    var title = feedback.title;
    $http.delete('/api/v1/secure/feedbackDefs/' + feedback._id).success(function(response) {
      refresh();
      growl.info(parse("Feedback [%s]<br/>Deleted successfully", title));
    })
    .error(function(data, status){
      growl.error("Error deleting feedback");
    }); // http delete feedback ends
  }; // delete method ends

  $scope.update = function() {    
    //console.log($scope.feedback);
    $http.put('/api/v1/secure/feedbackDefs/' + $scope.feedbackDefs._id,  $scope.feedbackDefs).success(function(response) {
      refresh();
      growl.info(parse("Feedback [%s]<br/>Edited successfully", $scope.feedback.title));
    })
    .error(function(data, status){
      growl.error("Error updating feedback");
    }); // http put feedback ends
  }; // update method ends

  $scope.cancel = function() {

    $scope.feedbackDefs="";
    $location.path("/");
  }

  // feedback item table
  $scope.addItem=function(item){
  	console.log('hi');
    console.log(item.query);
    console.log(item.mode);
    console.log(item.choices);

    $scope.items.push({
      query: item.query,
      mode: item.mode,
      choices: item.choices
    });

    item.query='';
    item.mode='';
    item.choices='';
  };

  $scope.removeItem = function(index){
    $scope.items.splice(index, 1);
  }; 

  $scope.editItem = function(index,item){    
    $scope.item = item;    
    $scope.items.splice(index, 1);
  };

}])

//services and drirectives for ngFloatingLables//
var messages = {
    required: "this field is required",
    minlength: "min length of @value@ characters",
    maxlength: "max length of @value@ characters",
    pattern: "don\'t match the pattern",
    "email": "mail address not valid",
    "number": "insert only numbers",
    "custom": "custom not valid type \"@value@\"",
    "async": "async not valid type \"@value@\""
};

feedbackApp.directive('customValidator', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$validators.custom = function (value) {
                return value === "foo";
            };
        }
    };
});

feedbackApp.service('$fakeValidationService', ['$q', function ($q) {
    return {
        "get": function (value) {
            var deferred = $q.defer();

            setTimeout(function () {
                if (value === "bar") {
                    deferred.resolve({valid: true});
                } else {
                    deferred.reject({valid: false});
                }
            }, 3000);

            return deferred.promise;
        }
    }
}])

feedbackApp.directive('asyncValidator', ['$fakeValidationService', '$q', function ($fakeValidationService, $q) {
    return {
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.async = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                if(value.length){
                    element.before('<i class="icon-spin icon-refresh"></i>').parent().addClass('spinner');

                    return $fakeValidationService.get(value).then(function(response) {
                        element.parent().removeClass('spinner').find('i').remove();
                        return true;
                    }, function(response) {
                        element.parent().removeClass('spinner').find('i').remove();
                        if (!response.valid) {
                            return $q.reject();
                        }
                    });
                }
            };
        }
    }
}])


