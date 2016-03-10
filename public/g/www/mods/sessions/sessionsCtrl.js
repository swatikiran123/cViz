angular.module('sessions', [])

.controller('sessionsCtrl', function($scope, $http) {
    $http.get('/api/v1/secure/visitSchedules').success(function(response) {
        $scope.visitScheduleList = response;
    });
})

.controller('sessionCtrl', function($scope, $routeParams, $http) {
    console.log("session controller running");
    $http.get('/api/v1/secure/visitSchedules/' + $routeParams.id).success(function(response) {
        $scope.visitSchedule = response;
    });
});
