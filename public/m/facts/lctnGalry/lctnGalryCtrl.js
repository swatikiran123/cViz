angular.module('lctnGalry', ['ui.bootstrap.carousel'])
    .controller('lctnGalryCtrl', function ($scope,  $rootScope, $uibModalInstance, $filter , cscLocation , $http) {
			console.log("location gallery controller running");
        $scope.cscLocation = cscLocation;
        $scope.weatherData = [];
        $scope.precipitation = "0";
        $scope.averageTemp = 0;
        $scope.myInterval = 0;
        var imageName;
        $scope.slides = [
            {
                image: '/public/uploads/images/location/Chennai_Central_Station_panorama.jpg'
            },
            {
                image: '/public/uploads/images/location/Chennai_panorama2.jpg'
            },
            {
                image: '/public/uploads/images/location/Chennai_panorama3.jpg'
            },
            {
                image: '/public/uploads/images/location/Chennai_panorama4.jpg'
            }
        ];

        $scope.thumbnailImages = [
            {
                id: 1,
                image: '/public/uploads/images/location/chennai-thumb-1.jpg'
            },
            {
                id: 2,
                image: '/public/uploads/images/location/chennai-thumb-2.jpg'
            },
            {
                id: 3,
                image: '/public/uploads/images/location/chennai-thumb-3.jpg'
            },
            {
                id: 4,
                image: '/public/uploads/images/location/chennai-thumb-4.jpg'
            }
        ];

        $scope.searchWeather = function () {
            var searchTerm = $scope.cscLocation;
            $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&units=metric&APPID=73136fa514890c15bc4534e7b8a1c0c4',{
        cache: true
    })
                .success(function (data) {
                    $scope.weatherData = data;
                    console.log($scope.weatherData);

                    if ($scope.weatherData.rain != null) {
                        $scope.precipitation = $scope.weatherData.rain["3h"];
                    }
                    $scope.precipitation = $scope.precipitation + "mm";

                    $scope.loadThumbnailImages();
                });
        };

        $scope.loadThumbnailImages = function () {
            angular.forEach($scope.thumbnailImages, function (n) {
                imageName = 'url(' + n.image + ')';
                console.log(imageName);
                $('.carousel-indicators li:nth-child(' + n.id + ')').css('background-image', imageName);
            });
        };

        $scope.close = function () {
            $uibModalInstance.dismiss();
        };

        $scope.searchWeather();
    });
