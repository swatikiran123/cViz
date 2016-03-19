angular.module('locDisp', []).factory('geolocationSvc', ['$q', '$window', function ($q, $window) {

    'use strict';

    function getCurrentPosition() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
					console.log('Geolocation not supported.');
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
									console.log("Found poistion");
									console.log(position);
                    deferred.resolve(position);
                },
                function (err) {
									console.log(err);
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }

    return {
        getCurrentPosition: getCurrentPosition
    };
}]);
