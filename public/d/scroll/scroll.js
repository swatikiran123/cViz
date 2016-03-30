angular.module('scroll', [])   
.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
			console.log("scrolling...");
    	 	scope.navClass = 'tb-big';
        //scope.data = false;
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 scope.navClass = 'tb-small';
                 //scope.data = true;
             } else {
                  scope.navClass = 'tb-big';
                  //scope.data = false;
             }
            scope.$apply();
        });
    };
});
