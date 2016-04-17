
angular.module('visitAdd', ['ngRoute','ui.calendar','angular-growl','textAngular','ngMaterial','ngMessages','ngImgCrop','ngFileUpload'])

.run(function ($rootScope, $location, $http) {
	$http.get('/token')
  .success(function (user, status) {
    if (user) {
     $rootScope.user = user;
   }
   else {
			// user not found, ask to login
    }
  });
})

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
  .when('/add',{
    templateUrl: '/public/mods/visits/visitsViewAdd.html',
    controller: 'visitsControllerMain'
  })

  $routeProvider.otherwise('/home');

}]);
