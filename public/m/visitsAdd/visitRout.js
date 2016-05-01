angular.module('visitAdd')

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/add',{
    templateUrl: '/public/m/visitsAdd/visitAdd.html',
    controller: 'visitsControllerMain'
  })
}]);