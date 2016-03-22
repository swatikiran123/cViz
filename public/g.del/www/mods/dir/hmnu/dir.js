angular.module('HamMenu', [])
    .directive('hamMenu', function() {
        return {
            restrict: 'E',
            templateUrl: '/public/g/www/mods/dir/hmnu/tmpl.html',
            replace: true,
            controller: function($scope) {
                $scope.expanded = false;
                $scope.openMenu = function() {
                    $scope.expanded = $scope.expanded ? false : true;
                };
            }
        };
    });
