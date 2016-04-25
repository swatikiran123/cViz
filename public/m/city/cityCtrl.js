var app = angular.module('facts');

app.controller('cityCtrl', function ($scope, $location, $routeParams, $http, NgMap) {
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

 $scope.searchForecast = function () {   
  var searchTerm = $scope.name;   
  $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + searchTerm + '&units=metric&cnt=5&&appid=73136fa514890c15bc4534e7b8a1c0c4')
  .success(function (data) {
   $scope.today = new Date();
   $scope.day1 = data.list[0];
   $scope.day2 = data.list[1];
   $scope.day3 = data.list[2];
   $scope.day4 = data.list[3];
   $scope.day5 = data.list[4];
   $scope.day1icon = "/public/assets/m/img/ic/"+ $scope.day1.weather[0].icon +".png";
   $scope.day2icon = "/public/assets/m/img/ic/"+ $scope.day2.weather[0].icon +".png";
   $scope.day3icon = "/public/assets/m/img/ic/"+ $scope.day3.weather[0].icon +".png";
   $scope.day4icon = "/public/assets/m/img/ic/"+ $scope.day4.weather[0].icon +".png";
   $scope.day5icon = "/public/assets/m/img/ic/"+ $scope.day5.weather[0].icon +".png";

   var day1 = moment.unix($scope.day1.dt);
   var day2 = moment.unix($scope.day2.dt);
   var day3 = moment.unix($scope.day3.dt);
   var day4 = moment.unix($scope.day4.dt);
   var day5 = moment.unix($scope.day5.dt);

   $scope.day1Day = day1._d.toString();
   $scope.day2Day = day2._d.toString();
   $scope.day3Day = day3._d.toString();
   $scope.day4Day = day4._d.toString();
   $scope.day5Day = day5._d.toString();
 });
}; 

$scope.searchWeather();
$scope.searchForecast();

$scope.findquickFactsForCity = function() {
 $http.get('/api/v1/secure/cityFacts/get/' + $scope.name)
 .success(function (response) {
  $scope.description = response.desc;
  $scope.bannerLink = response.bannerLink;
  $scope.quickFacts = response.quickFacts;
});
}

$scope.findquickFactsForCity();
NgMap.getMap().then(function(map) {
  $scope.map = map;
});

    //locating places with info window on map
    $scope.cities = [{
      id: 1,
      name: 'Hyderabad',
      info: 'am the top',
      url: 'https://maps.google.com',
      pos: [17.385044, 78.486671]
    },
    {
      id: 2,
      name: 'ShilpaRamam',
      info: 'the arts, crafts & cultural village at Hyderabad',
      url: 'https://maps.google.com',
      pos: [17.451, 78.37699999999995]
    },
    {
      id: 3,
      name: 'Golconda Fort',
      info: 'an archaeological treasure on the official "List of Monuments"',
      url: 'https://maps.google.com',
      pos: [17.3853626, 78.4041297]
    }];

    //onclick place pop a window 
    $scope.showCity = function(event, city) {
      $scope.selectedCity = city;
      $scope.map.showInfoWindow('InfoWindow', this);
    };



  });