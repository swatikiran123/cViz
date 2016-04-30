angular.module('contacts')

.controller('spocCtrl', function($scope, $rootScope, $location) {
	if($rootScope.activeVisit !== undefined){
		var str= String($rootScope.activeVisit.locations);
		var loc= str.split(",");
		$location.path("contacts/"+loc[0]);
	}
})

.controller('contactsCtrl', function($scope, $routeParams, $http) {

  $http.get('/api/v1/secure/contactList/city/' +$routeParams.city,{
    cache: true
  }).success(function(response) {
    $scope.contactList = response;
  })

	if($rootScope.activeVisit !== undefined){
    var str= String($rootScope.activeVisit.locations);
    $scope.cities = str.split(/[ ,]+/);

    $scope.title=response.visits.title;
    $scope.anchor=response.visits.anchor;

   	$http.get('/api/v1/secure/admin/users/'+$scope.anchor,{
	    cache: true
	  }).success(function(response) {
       $scope.anchor=response;
    })
   }

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
