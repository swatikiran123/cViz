angular.module('sessions')

.controller('sessionsCtrl', function($scope, $routeParams, $http) {
	console.log("sessions controller working")
    $http.get('/api/v1/secure/visits/' + $routeParams.id + '/sessions').success(function(response) {
			console.log(JSON.stringify(response));
        $scope.scheduleList = response;
    });
})

.controller('sessionCtrl', function($scope, $routeParams, $http) {
    console.log("session controller running");
    $http.get('/api/v1/secure/visitSchedules/' + $routeParams.id).success(function(response) {
        $scope.session = response;

    });
})


 .controller('sessionDetailsCtrl', function($scope) {

          console.log("sessionDetail controller running");
        $scope.session_details = [{
            'name': 'Mobility',
            'time': '10:30',
            'venue': 'Bedroom 2, 4th floor, EGL',
            'picture' : '/public/uploads/images/location/Chennai_Central_Station_panorama.jpg',
            'description': 'Mobility represents future. How enterprises interact with customers, employees, partners and machines as we increasingly access the internet and control the world from the palm of our hands.',
            'presenter': [{
                'picture': '/public/assets/g/imgs/avatar.jpg',
                'name': 'Mr Vincent Chase',
                'designation': 'Sr Analyst, CSC India',
                'bio': 'Met my aggressive timeline requirement with very good quality. Worked with me to come up with a viable solution to meet the timeline. Easy to work with and have the customers best interest in mind. You can find less expensive alternatives but the quality and responsiveness is well worth the price',
                'email': 'vincent@csc.com',
                'telephone': '+555 555 555'
            }],
            'participants': [{
                'name': 'Mr Chris Hemsworth',
                'picture': '/public/assets/g/imgs/avatar.jpg',
                'designation': 'Sr Analyst, EMC Inc, IL, USA'
            }, {
                'name': 'Mr John Anderson',
                'picture': '/public/assets/g/imgs/avatar.jpg',
                'designation': 'Sr Analyst, EMC Inc, IL, USA'
            }, {
                'name': 'Mr Mary Hook',
                'picture': '/public/assets/g/imgs/avatar.jpg',
                'designation': 'Sr Analyst, EMC Inc, IL, USA'
            }]
        }]

        
    });
