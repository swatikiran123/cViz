

var app = angular.module('home');

app.controller('homeCtrl', ['$scope', 'location', function ($scope, location) {
   location.get(angular.noop, angular.noop);
   $scope.dayHighlighter = [{
   	    day:"1",
     	date: "10 Apr 2016",
		location: "Noida",
		starts: "09:30",
		ends: "17:30",
		climate: {
			temp: "26C",
			humidity:"12",
			dayLike: "cloudy"
		}
   },
   {
        day:"2",
     	date: "11 Apr 2016",
		location: "Hyderabad",
		starts: "09:30",
		ends: "17:30",
		climate: {
			temp: "37C",
			humidity:"12",
			dayLike: "sunny"
   }
},
{
        day:"3",
     	date: "13 Apr 2016",
		location: "Bangalore",
		starts: "09:30",
		ends: "17:30",
		climate: {
			temp: "20C",
			humidity:"12",
			dayLike: "rainy"
   }
},
{
        day:"4",
     	date: "14 Apr 2016",
		location: "Vadodara",
		starts: "09:30",
		ends: "17:30",
		climate: {
			temp: "25C",
			humidity:"12",
			dayLike: "rainy"
   }
}];
}]);


app.controller('welcomeCtrl', ['$scope', 'location', function ($scope, location) {

}]);

app.controller('thankyouCtrl', ['$scope', 'location', function ($scope, location) {

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


