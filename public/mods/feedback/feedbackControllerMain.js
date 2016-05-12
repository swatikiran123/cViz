'use strict';

var feedbackApp = angular.module('feedback');

feedbackApp.controller('feedbackControllerMain', ['$scope', '$http', '$routeParams','$location', 'growl','$rootScope','$mdDialog',
	function($scope, $http, $routeParams, $location,growl,$rootScope,$mdDialog) {
 	$scope.items=[];
 	var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.nameonly= "nameonly";
  $scope.hideFilter = true;
  var refresh = function() {

    $http.get('/api/v1/secure/feedbackDefs').success(function(response) {

      $scope.feedbackList = response;
      $scope.feedbackDefs = "";
      $scope.items=[];

      switch($scope.mode)    {

        case "add":
          $scope.feedbackDefs = "";
          break;

        case "edit":
          $scope.feedbackDefs = $http.get('/api/v1/secure/feedbackDefs/id/' + id).success(function(response){
            var feedbackDefs = response;
            $scope.items = feedbackDefs.item;       //list of item
            $scope.feedbackDefs = feedbackDefs;     //whole form object
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

      $location.path("feedbackTmpl/list");
  } // end of save method


  $scope.create = function() {

    var inData = $scope.feedbackDefs;
    inData.item = $scope.items;
    inData.createBy = $rootScope.user._id;

    $http.post('/api/v1/secure/feedbackDefs', inData).success(function(response) {
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

  $scope.copy = function(feedback) {
    delete feedback._id;
    var title = "Copy of " + feedback.title;
    feedback.title = title;
    $http.post('/api/v1/secure/feedbackDefs/',feedback).success(function(response) {
      refresh();
      growl.info(parse("Template [%s]<br/>Copied successfully", title));
    })
    .error(function(data, status){
      growl.error("Error Copying Template");
    });
  };

  $scope.update = function() {

    $http.put('/api/v1/secure/feedbackDefs/' + $scope.feedbackDefs._id,  $scope.feedbackDefs).success(function(response) {
      refresh();
      growl.info(parse("Feedback [%s]<br/>Edited successfully", $scope.feedbackDefs.title));
    })
    .error(function(data, status){
      growl.error("Error updating feedback");
    }); // http put feedback ends
  }; // update method ends

  $scope.cancel = function() {

    $scope.feedbackDefs="";
    $location.path("feedbackTmpl/list");
  }

  // feedback item table
  $scope.addItem=function(item){

    $scope.items.push({
      query: item.query,
      mode: item.mode,
      choices: item.choices
    });

    item.query='';
    item.mode='';
    item.choices='';
    $mdDialog.hide();
  };

  $scope.removeItem = function(index){
    $scope.items.splice(index, 1);
  };

  $scope.editItem = function(index,item,ev){
    $scope.item = item;
    $scope.items.splice(index, 1);
    $mdDialog.show({
      templateUrl: '/public/mods/feedback/itemViewDialog.html',
      scope: $scope.$new(),
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false
    })
  };

  $scope.addFeedbackItem = function(ev) {
    $mdDialog.show({
      templateUrl: '/public/mods/feedback/itemViewDialog.html',
      scope: $scope.$new(),
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false
    })
  };

  $scope.showFeedbackTemp = function(ev,id) {
    $mdDialog.show({
      controller: fbackDialog,
      templateUrl: '/public/mods/feedback/feedbackViewDialog.html',
      // scope: $scope.$new(),
      locals: { feedbackid: id },
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false
    })
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.canceldialog = function(item) {

    if(item === undefined || item=== '')
    {
      console.log('Hi');
      $mdDialog.cancel();
    }

    if(item)
    {
      console.log(item);
      $scope.items.push({
       query: item.query,
       mode: item.mode,
       choices: item.choices
     });

      item.query='';
      item.mode='';
      item.choices='';
      $mdDialog.cancel();
    };
  }

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

function fbackDialog($scope, $mdDialog,$http,feedbackid) {

  $scope.feedback_id = feedbackid;
  $scope.visit_id = "a01234567892345678900001";
  $scope.hide = function() {
//    console.log($scope.model);
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}