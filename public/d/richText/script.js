angular.module('richTextDirective', [])

.directive('richtext', [function() {
    return {
        scope: {
            bodyText: '='
        },
        template: '<p ng-bind-html="teste"></p>',
        controller: function($scope,  $sce){
          
          $scope.$watch('bodyText', function(value){
            $scope.teste = $sce.trustAsHtml(value);
          })
          
        }
    };
}]);
