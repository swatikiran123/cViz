

var app = angular.module('home');

app.controller('homeCtrl', function($scope, geolocationSvc) {

	console.log("home controller running");
	geolocationSvc.getCurrentPosition().then(function(loc){
		console.log("location found " + JSON.stringify(loc));
	});

});
