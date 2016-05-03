var client=angular.module('client', ['ngRoute'])

client.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

	.when('/client/:id/info', {
		templateUrl: '/public/m/client/client.html',
		controller: 'clientCtrl'
	});

}])

client.controller('clientCtrl', function($scope, $routeParams, $http) {

	$http.get('/api/v1/secure/clients/id/' + $routeParams.id,{
		cache: true
	}).success(function(response) {
		$scope.client = response;
	});


        $scope.collapseDiv = function(index, text) {
            var ele = angular.element(document.getElementById(text + index));
            ele.toggle();
            var status = window.getComputedStyle(ele[0], null).getPropertyValue("display");
            if (status === "block") {
                ele.prev().addClass('chevron-down-arrow');
                ele.addClass('active');
            } else if (status === "none") {
                ele.prev().removeClass('chevron-down-arrow');
                ele.removeClass('active');
            }
        };

        $scope.viewAgenda = function(event) {
            event.stopPropagation();
        };
    })
