

var app = angular.module('home');

app.controller('homeCtrl', function ($scope, location, $routeParams, $http) {

	location.get(angular.noop, angular.noop);
	$scope.loading = true;
	$http.get('/api/v1/secure/visits/'+$routeParams.id+'/schedules').success(function(response) {
        //console.log(response);
        $scope.dayHighlighter = response;
        $scope.loading = false;
    })
});

app.controller('welcomeCtrl', ['$scope', 'location', function ($scope, location) {

}]);

app.controller('thankyouCtrl', ['$scope', 'location', function ($scope, location) {

}]);
app.controller('homeBlankCtrl', ['$scope', '$routeParams', '$http', '$location', function ($scope, $routeParams, $http, $location) {
	$http.get('/api/v1/secure/visits/all/activeVisit').success(function(response) {
		$location.path("home/" + response.visits._id);
	})
}]);

app.controller('splashCtrl', function($scope, $location) {


	$scope.links = [
	{            
		text1: 'CSC IN NEWS',
		desc1: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		text2: 'CSC QUICKFACTS',
		'desc2': [{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}]
	}, {            
		text1: 'CSC IN NEWS',
		desc1: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		text2: 'CSC QUICKFACTS',
		'desc2': [{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}]
	}, {            
		text1: 'CSC IN NEWS',
		desc1: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		text2: 'CSC QUICKFACTS',
		'desc2': [{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'},
		{text:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}]
	}];

	$scope.goToHome = function(){
           // $state.go('cvmHome');
           $location.path("m/main");
       };

   });
app.directive('carousel', function($timeout) {
	return {
		restrict: 'E',
		scope: {
			links: '='
		},
		templateUrl: '/public/m/home/carousel.html',
		link: function(scope, element) {
			$timeout(function() {
				$('.carousel-indicators li',element).first().addClass('active');
				$('.carousel-inner .item',element).first().addClass('active');
			});
		}
	}
});
