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

    var start = "BEGIN:VCARD\nVERSION:3.0\n";
    var end = "END:VCARD";
    var data = "";
    data += "FN:"+ $scope.contactList[i].name +'\n';
    data += "N:" + $scope.contactList[i].firstName + ';' + $scope.contactList[i].middleName + ';'  + $scope.contactList[i].lastName +'\n';
    data += "TEL;TYPE=CELL:" + $scope.contactList[i].contactNo + '\n';
    data += "EMAIL;TYPE=PREF,INTERNET:" + $scope.contactList[i].email+ '\n';
    data += "ORG:" + $scope.contactList[i].organization+ '\n';
    data += "TITLE:" + $scope.contactList[i].jobTitle+ '\n';
    data += "PHOTO;TYPE=JPEG:" + $scope.contactList[i].avatar+ '\n';
    data += "NOTE:" + $scope.contactList[i].summary+ '\n';
    var get = start + data + end;
    blob = new Blob([get], { type: 'text/vcard' });
    url = $window.URL || $window.webkitURL;
    $scope.fileDataUrl.push(url.createObjectURL(blob));
    }
  })

  appService.activeVisit().then(function(avisit){
    var str= String(avisit.locations);
    $scope.cities = str.split(/[ ,]+/);

    $scope.title=avisit.client.name;
    $scope.anchor=avisit.anchor;

    $http.get('/api/v1/secure/admin/users/'+$scope.anchor,{
      cache: true
    }).success(function(response) {
       $scope.anchor=response;
       $scope.anchorName = response.name.prefix + response.name.first + response.name.middle + response.name.last + response.name.suffix;
       console.log($scope.anchor);
       var start = "BEGIN:VCARD\nVERSION:3.0\n";
       var end = "END:VCARD";
       var data = "";
       data += "FN:"+ $scope.anchor.name.first + ' ' + $scope.anchor.name.middle + ' ' + $scope.anchor.name.last + '\n';
       data += "N:" + $scope.anchor.name.first + ';' + $scope.anchor.name.last + '\n';
       data += "TEL;TYPE=CELL:" + $scope.anchor.contactNo[0].contactNumber + '\n';
       data += "EMAIL;TYPE=PREF,INTERNET:" + $scope.anchor.email+ '\n';
       data += "ORG:" + $scope.anchor.organization+ '\n';
       data += "TITLE:" + $scope.anchor.jobTitle+ '\n';
       data += "PHOTO;TYPE=JPEG:" + $scope.anchor.avatar+ '\n';
       data += "NOTE:" + $scope.anchor.summary+ '\n';
       var get = start + data + end;
       blob = new Blob([get], { type: 'text/vcard' });
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

  function transcodeToAnsi(content){
  var encoding = "windows-1252";
  var nonstandard = {NONSTANDARD_allowLegacyEncoding: true};
  return new TextEncoder(encoding, nonstandard).encode(content);
}

})

.directive('filterList', function($timeout) {
    return {
        link: function(scope, element, attrs) {

            var li = Array.prototype.slice.call(element[0].children);
            function filterBy(value) {
                li.forEach(function(el) {
                    var a = angular.element(el).html();
                    el.style = a.indexOf(value.toLowerCase()) !== -1 ? '' : 'display:none';
                });
            }

            scope.$watch(attrs.filterList, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    filterBy(newVal);
                }
            });
        }
    };
})

.config(['$compileProvider', function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|sms|blob|mailto|tel|):/);
}]);