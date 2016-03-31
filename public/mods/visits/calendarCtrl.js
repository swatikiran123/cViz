angular.module('visits').controller('calendarCtrl',
    function($scope, $compile, $timeout, $http) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        $scope.formData = {};
        $scope.uiConfig = {
            calendar: {
                height: 750,
                editable: false,
                header: {
                    left: 'title',
                    center: 'type',
                    right: 'today prev,next'
                },
                dayClick: $scope.alertEventOnClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize
            }
        };

        $scope.events = [];
        var count = 0;

        /* event sources array*/
        $scope.eventSources = [$scope.events];

        $http.get('/api/v1/secure/visits').success(function(response) {
            $scope.visits = response;
            // $scope.schedule = [];
            // angular.forEach($scope.visits, function(a) {
            //     angular.forEach(a.schedule, function(b) {
            //         $scope.schedule.push(b);
            //     });

            // });
            populateEvents();
        });

        function populateEvents() {
            $timeout(function() {
                $scope.visits.forEach(function(data) {
                    $scope.events.push({
                        title: data.locations,
                        start: data.startDate,
                        end: data.endDate
                    });
                });
                count = count + 1;
            });
        }
        /* Change View */
        $scope.changeView = function(view, calendar) {
            calendar.fullCalendar('changeView', view);
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
            calendar.fullCalendar('render');
        };
    });