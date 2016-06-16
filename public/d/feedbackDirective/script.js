

angular.module('feedbackDirective', ['ngRateIt','ngAnimate', 'toaster'])

.controller('feedbackDirectiveControllerMain', ['$scope', '$http','$rootScope','$timeout','toaster','$location','$window', function($scope, $http, $rootScope,$timeout,toaster,$location,$window) {
// console.log($scope.feedbackModel);
console.log($scope.fbid);
  if($scope.feedbackModel === undefined || $scope.feedbackModel === "")
    $scope.showFlag = "none";
  else
    $scope.showFlag = "feedback";

if($scope.fbid == undefined || $scope.fbid == '' || $scope.fbid == null)
{
  $scope.getFeedback = function(){
    if($scope.feedbackId===""){
      $scope.showFlag = "none";
      return;
    }

    $http.get('/api/v1/secure/feedbackDefs/id/' + $scope.feedbackId).success(function(response) {
      $scope.feedbackModel = response;
      $scope.showFlag = "feedback";
    })
    .error(function(response, status){
      $scope.showFlag = "noFeedback";
      if(status===404)
      {
        message = "Feedback not found";
      }
      else
        console.log("error with feedback directive");
    });
  }
}

if($scope.fbid != undefined)
{
  $scope.selection = [];
  console.log('edit');
  console.log($scope.fbid);
  $scope.getFeedback = function(){
  $http.get('/api/v1/secure/feedbacks/'+ $scope.fbid).success(function(response) {
    $scope.feedbackModel = response;
    $scope.showFlag = "feedback";
    // console.log($scope.feedbackModel);
    console.log($scope.feedbackModel.item)
    for(var i=0;i<$scope.feedbackModel.item.length;i++)
    {
      if($scope.feedbackModel.item[i].mode=="multi-choice")
      {
        console.log($scope.feedbackModel.item[i].answer.split(","));
        var data = $scope.feedbackModel.item[i].answer.split(",");
        for(var k =0;k<data.length;k++)
        {
          $scope.selection.push(data[k]);  
        }
        // $scope.selection.push($scope.feedbackModel.item[i].answer.toString().split(","));
      }
    }
  });
}
}

var arrayContains = Array.prototype.indexOf ?
    function(arr, val) {
        return arr.indexOf(val) > -1;
    } :
    function(arr, val) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === val) {
                return true;
            }
        }
        return false;
    };

function arrayIntersection() {
    var val, arrayCount, firstArray, i, j, intersection = [], missing;
    var arrays = Array.prototype.slice.call(arguments); // Convert arguments into a real array

    // Search for common values
    firstArr = arrays.pop();
    if (firstArr) {
        j = firstArr.length;
        arrayCount = arrays.length;
        while (j--) {
            val = firstArr[j];
            missing = false;

            // Check val is present in each remaining array
            i = arrayCount;
            while (!missing && i--) {
                if ( !arrayContains(arrays[i], val) ) {
                    missing = true;
                }
            }
            if (!missing) {
                intersection.push(val);
            }
        }
    }
    return intersection;
}

 function deleteData() {
    delete $scope.feedbackModel._id;
    delete $scope.feedbackModel.createBy;
    delete $scope.feedbackModel.title;
    delete $scope.feedbackModel.createOn;
 }

  $scope.submit = function() {

    deleteData();
    providedById = $rootScope.user._id;
    $scope.feedbackModel.visitid = $scope.visitId;
    $scope.feedbackModel.template = $scope.feedbackId;
    $scope.feedbackModel.providedBy = providedById;
    $scope.feedbackModel.feedbackOn = $scope.type;
    $scope.feedbackModel.sessionid = $scope.sessionId;
    for(var i=0;i<$scope.feedbackModel.item.length;i++)
    {
      $scope.feedbackModel.item[i].providedBy = providedById;
    }

    if($scope.fbid==undefined)
    {
    $http.post('/api/v1/secure/feedbacks/', $scope.feedbackModel).success(function(response) {
    })
    }

    if($scope.fbid!=undefined)
    {
      $http.put('/api/v1/secure/feedbacks/'+ $scope.fbid, $scope.feedbackModel).success(function(response) {
      })
    }

    if($scope.type=='session')
    {
    $scope.showSuccessMessage();
    }

    if($scope.type=='visit')
    {
      $location.path('/thankyou');
    }
  };

  $scope.selection = [];
  // toggle selection for a given choice by name
  $scope.toggleSelection = function toggleSelection(choice,index) {

    var idx = $scope.selection.indexOf(choice);
      // is currently selected
      if (idx > -1) {
        $scope.selection.splice(idx, 1);
      }

      // is newly selected
      else {
        $scope.selection.push(choice);
      }

      var answerChoice = arrayIntersection( $scope.feedbackModel.item[index].choices.toString().split(","),$scope.selection.toString().split(","));
      $scope.feedbackModel.item[index].answer = answerChoice.toString();
    };

if($scope.fbid == undefined || $scope.fbid == '' || $scope.fbid == null)
{
$scope.showSuccessMessage= function()
{
  toaster.pop({body:"Thank you for your valuable feedback."});
  $timeout(callSubmit,5000);
}
}

if($scope.fbid != undefined)
{
$scope.showSuccessMessage= function()
{
  toaster.pop({body:"Your feedback has been updated successfully."});
  $timeout(callSubmit,5000);
}
}

function callSubmit() {
    window.history.back();
}


}])

.directive('feedback', function() {
  return {
    controller: 'feedbackDirectiveControllerMain',
    templateUrl: '/public/d/feedbackDirective/templates/feedbackPage.html',
    scope: {
      feedbackModel: "=feedbackModel",
      feedbackId: "=feedbackId",
      visitId: "=visitId",
      sessionId: "=sessionId",
      type: "@type",
      fbid: "=fbid"
    },

};
});