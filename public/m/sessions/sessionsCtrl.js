angular.module('sessions')

.controller('sessionsCtrl', function($scope, $routeParams, $http) {
	console.log("sessions controller working")
    $http.get('/api/v1/secure/visits/' + $routeParams.id + '/sessions').success(function(response) {
        $scope.scheduleList = response;
    });
})

.controller('sessionCtrl', function($scope, $routeParams, $http) {
    console.log("session controller running");
    $http.get('/api/v1/secure/visitSchedules/' + $routeParams.id).success(function(response) {
        $scope.session = response;
    });
});
