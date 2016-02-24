'use strict';

var clientsApp = angular.module('clients');

clientsApp.controller('clientsControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl', 
	function($scope, $http, $routeParams, $location, growl) {

		console.log("clients controller invoked");

  //acts as get all data
  var refresh = function() {
  	$http.get('/api/v1/clients').success(function(response) {
  		console.log("I got the data I requested");
  		$scope.clientsList = response;
  		$scope.clients = "";
  	});
  };
  refresh();


//add a clients
$scope.addclients = function(){
	console.log($scope.clients);
	$http.post('/api/v1/clients',$scope.clients).success(function(response) {
		console.log(response);
		refresh();
	});
};

//remove a clients
$scope.remove = function(id) {
	console.log(id);
	$http.delete('/api/v1/clients/' + id).success(function(response) {
		refresh();
	});
};

//edit a clients
$scope.edit = function(id) {
	console.log(id);
	$http.get('/api/v1/clients/' + id).success(function(response) {
		$scope.clients=response;
	});
}; 

//update a clients
$scope.update = function() {
	console.log($scope.clients._id);
	$http.put('/api/v1/clients/' + $scope.clients._id, $scope.clients).success(function(response) {
		refresh();
	})
};

//clear a clients
$scope.deselect = function() {
	$scope.clients = "";
}

}])



