var app=angular.module('facts');

app.controller('factsCtrl', function($scope, $rootScope, $location, $uibModal, $http) {
			console.log("fact controller running");

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

        });
        $scope.cscIndiaLocations = [
            {
                cityName: "Noida",
                id: 7279746
            },
            {
                cityName: "Indore",
                id: 1269743
            },
            {
                cityName: "Vadodara",
                id: 1253573
            },
            {
                cityName: "Mumbai",
                id: 1275339
            },
            {
                cityName: "Hydrabad",
                id: 1176734
            },
            {
                cityName: "Bangalore",
                id: 1277333
            },
            {
                cityName: "Chennai",
                id: 1264527
            }];

        $scope.openGallery = function (cityName) {
            console.log(cityName);
            var modalView = $uibModal.open({
                templateUrl: '/public/m/facts/lctnGalry/lctnGalry.html',
                controller: 'lctnGalryCtrl',
                backdrop: 'static',
                windowClass: 'modal-dialog-cscLocationGallery',
                resolve: {
                    cscLocation: function () {
                        return cityName;
                    }
                }
            });
        };




        $scope.goBack = function () {
            $state.go('cvmHome');
        };

        $scope.openFactsheetMenu = function(){
            /*console.log("openFactsheetMenu");*/
            angular.element('body').css('overflow' , 'hidden');
            $scope.openFactsheetMenuFlag = $scope.openFactsheetMenuFlag ? false : true;

        };

        $scope.scrollToDiv = function(scrolledToDiv){
          $scope.openFactsheetMenuFlag = false;
          angular.element('body').css('overflow' , 'scroll');
          console.log(scrolledToDiv);
          /*console.log(angular.element(scrolledToDiv).pageY;*/
          // console.log(angular.element(scrolledToDiv).prop('offsetTop'));
          /*window.scrollTo(0, angular.element(scrolledToDiv).prop('offsetTop'));*/
        };

        /***** India journey js code **************/
        $scope.journeyImages = [
            {
                year: 1998,
                line_slice: '/public/uploads/images/journeypics/track-line.png',
                image1: '/public/uploads/images/journeypics/1-foundation.png',
                startedText1: "1500",
                startedText2: "EMPLOYEES",
                image2: '/public/uploads/images/journeypics/profile-pic.png',
                titleText: "BPO, Product Development",
                title: "OFF SHORING"
            },
            {
                year: 2004,
                line_slice: '/public/uploads/images/journeypics/track-line.png',
                image1: '/public/uploads/images/journeypics/2-off-shoring.png',
                startedText1: "7000",
                startedText2: "EMPLOYEES",
                image2: '/public/uploads/images/journeypics/profile-pic.png',
                titleText: "PM, Architecture, Infra, SAP",
                title: "STRATEGIC FOCUS"
            },
            {
                year: 2006,
                line_slice: '/public/uploads/images/journeypics/track-line.png',
                image1: '/public/uploads/images/journeypics/3-strategic-focus.png',
                startedText1: "14000",
                startedText2: "EMPLOYEES",
                image2: '/public/uploads/images/journeypics/profile-pic.png',
                titleText: "Oracle, Testing, New Business",
                title: "SERVICE OWNERSHIP"
            },
            {
                year: 2010,
                line_slice: '/public/uploads/images/journeypics/track-line.png',
                image1: '/public/uploads/images/journeypics/4-service-ownership.png',
                startedText1: "20355",
                startedText2: "EMPLOYEES",
                image2: '/public/uploads/images/journeypics/profile-pic.png',
                titleText: "Mobility, Cloud, EI"
            }
        ];
    });
