angular.module('sessions', [])

.controller('sessionsCtrl', function($scope) {

  $scope.sessions = [
    { title: 'Welcome note by Managing Director', id: 1, startTime: '08:30', endTime: '09:00' },
    { title: 'Keynote session from Chief of Operations', id: 2, startTime: '09:00', endTime: '09:30' },
    { title: 'Big Data Session', id: 3, startTime: '09:30', endTime: '10:30' },
    { title: 'Tea Break', id: 4, startTime: '10:30', endTime: '11:30' },
    { title: 'Innovation Session', id: 5, startTime: '11:30', endTime: '12:30' },
    { title: 'Lunch', id: 6, startTime: '12:30', endTime: '13:30' }
  ];
})

.controller('sessionCtrl', function($scope, $stateParams) {
	console.log("session controller running");
	$scope.session = { title: 'Welcome note by Managing Director', id: 1, startTime: '08:30', endTime: '09:00' };
});
