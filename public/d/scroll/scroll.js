angular.module('scroll', [])
.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
    	 	scope.navClass = 'tb-big';
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 scope.navClass = 'tb-small';
             } else {
                  scope.navClass = 'tb-big';
             }
            scope.$apply();
        });
    };
});
