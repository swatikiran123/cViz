angular.module('sessions')

.controller('sessionsCtrl', function($scope, $routeParams, $http) {
	console.log("sessions controller working");
    $http.get('/api/v1/secure/visits/' + $routeParams.id + '/sessions').success(function(response) {
        $scope.scheduleList = response;
				//console.log(JSON.stringify($scope.scheduleList,null,2));
    });

		$scope.feedback_id="56fd0eddabb181fc2a3466cf";
    $scope.visit_id = "a01234567892345678900001";

		$scope.hideFeeedbackDiv = true;
		$scope.toggleFeedbackDialog = function(index, $event){
			$scope.hideFeeedbackDiv = !$scope.hideFeeedbackDiv;
			$event.stopPropagation();
		};

})

.controller('sessionCtrl', function($scope, $routeParams, $http) {
    console.log("session controller running");
    $http.get('/api/v1/secure/visitSchedules/' + $routeParams.id).success(function(response) {
        $scope.session = response;
				console.log(JSON.stringify($scope.session,null,2));
		});

		$scope.hideFeeedbackDiv = true;
   	$scope.toggleFeedbackDialog = function(index, $event){
            $scope.hideFeeedbackDiv = !$scope.hideFeeedbackDiv;
            $event.stopPropagation();
        };
})

.controller('agendaCtrl', function($scope, $routeParams, $http, $location) {
    console.log("agenda controller running");
		$http.get('/api/v1/secure/visits/all/activeVisit').success(function(response) {
				//console.log("next visit id " + "#/sessions/" + response.visits._id));
				$location.path("sessions/" + response.visits._id);
		});
})
