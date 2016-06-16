angular.module('contacts')

.controller('spocCtrl', function($scope, $rootScope, $location, appService) {

  appService.activeVisit().then(function(avisit){
    var str= String(avisit.locations);
    var loc= str.split(",");
    $location.path("contacts/"+loc[0]);
  })

})

.controller('contactsCtrl', function($scope, $routeParams, $http, appService,$window) {
  $scope.fileDataUrl =[];
  $http.get('/api/v1/secure/contactList/city/' +$routeParams.city,{
    cache: true
  }).success(function(response) {
    $scope.contactList = response;

    console.log(response);
    for(var i=0;i<$scope.contactList.length;i++)
    {
    var data = "Name:" + $scope.contactList[i].name+ " "+"Contact No: "+$scope.contactList[i].contactNo+" "+"Email: "+$scope.contactList[i].email+"     "+"Summary: "+$scope.contactList[i].summary,
    blob = new Blob([data], { type: 'text/plain' }),
    url = $window.URL || $window.webkitURL;
    $scope.fileDataUrl.push(url.createObjectURL(blob));
    }
  })

  appService.activeVisit().then(function(avisit){
    var str= String(avisit.locations);
    $scope.cities = str.split(/[ ,]+/);

    $scope.title=avisit.title;
    $scope.anchor=avisit.anchor;

    $http.get('/api/v1/secure/admin/users/'+$scope.anchor,{
      cache: true
    }).success(function(response) {
       $scope.anchor=response;
       $scope.anchorName = response.name.prefix + response.name.first + response.name.middle + response.name.last + response.name.suffix;
       console.log($scope.anchor);
       var data = "Name:" + $scope.anchor.name.first + " " + $scope.anchor.name.last+ " "+"Contact No: "+$scope.anchor.contactNo[0].contactNumber+" "+"Email: "+$scope.anchor.email+"     "+"Summary: "+$scope.anchor.summary,
       blob = new Blob([data], { type: 'text/plain' }),
       url = $window.URL || $window.webkitURL;
       $scope.fileUrl = url.createObjectURL(blob);
    })
  })

  $scope.collapseDiv = function(index, text){
    var ele = angular.element(document.getElementById(text + index));
    ele.toggle();
    var status = window.getComputedStyle(ele[0], null).getPropertyValue("display");
    if(status === "block"){
      ele.prev().addClass('chevron-down-arrow');
    } else if(status === "none") {
      ele.prev().removeClass('chevron-down-arrow');
    }
  };


})

.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|sms|blob|mailto|tel|):/);
}]);