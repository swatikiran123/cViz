
angular.module('visitAdd', ['ngRoute','header','scroll'])



.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  // .when('/add',{
  //   templateUrl: '/public/mods/visits/visitAdd.html',
  //   controller: 'visitsControllerMain'
  // })
  .when('/add',{
    templateUrl: '/public/m/dummy2.html',
    // controller: 'homeBlankCtrl'
  });

// $routeProvider.otherwise('/home');

}]);
