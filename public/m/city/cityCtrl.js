var app = angular.module('facts');

app.controller('cityCtrl', function ($scope, $location, $routeParams, $http) {
		console.log("City Controller Running");
        $scope.name = $routeParams.name;
        $scope.order = 0;

        $scope.searchWeather = function () {
        	var searchTerm = $scope.name;
        	$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&units=metric&APPID=73136fa514890c15bc4534e7b8a1c0c4')
        	.success(function (data) {
        		$scope.weatherData = data;
        		if($scope.weatherData.weather[0].icon)
        		{	
        		$scope.icon = "/public/assets/m/img/ic/"+ $scope.weatherData.weather[0].icon +".png";
        		}
        	});
        };

        $scope.searchWeather();

        $scope.findquickFactsForCity = function() {
        	$http.get('/api/v1/secure/cityFacts/get/' + $scope.name)
        	.success(function (response) {
        		$scope.description = response.desc;
        		$scope.bannerLink = response.bannerLink;
        		$scope.quickFacts = response.quickFacts;
	     	});
        }

        $scope.findquickFactsForCity();
});