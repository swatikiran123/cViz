var bios = angular.module('execBios', ['ngRoute'])
bios.config(['$routeProvider', function ($routeProvider) {
  $routeProvider

  .when('/execBios', {
    templateUrl: '/public/m/execBios/execBios.html',
    controller: 'execBiosCtrl'
})
  

}])

bios.controller('execBiosCtrl', function($scope) {

    $scope.representatives = [{
        'csc_india_representatives': [{
            'name': 'Mr Ram',
            'picture': '/public/assets/g/imgs/avatar.jpg',
            'designation': 'Sr Analyst, CSC, India',
            'bio': 'Met my aggressive timeline requirement with very good quality. Worked with me to come up with a viable solution to meet the timeline. Easy to work with and have the customers best interest in mind. You can find less expensive alternatives but the quality and responsiveness is well worth the price',
            'email': 'vincent@csc.com',
            'telephone': '+555 555 555'
        }, {
            'name': 'Mr Sham',
            'picture': '/public/assets/g/imgs/avatar.jpg',
            'designation': 'Sr Analyst, CSC, India',
            'bio': 'Met my aggressive timeline requirement with very good quality. Worked with me to come up with a viable solution to meet the timeline. Easy to work with and have the customers best interest in mind. You can find less expensive alternatives but the quality and responsiveness is well worth the price',
            'email': 'vincent@csc.com',
            'telephone': '+555 555 555'
        }, {
            'name': 'Mrs Megha',
            'picture': '/public/assets/g/imgs/avatar.jpg',
            'designation': 'Sr Analyst, CSC, India',
            'bio': 'Met my aggressive timeline requirement with very good quality. Worked with me to come up with a viable solution to meet the timeline. Easy to work with and have the customers best interest in mind. You can find less expensive alternatives but the quality and responsiveness is well worth the price',
            'email': 'vincent@csc.com',
            'telephone': '+555 555 555'
        }],
        'client_representatives': [{
            'name': 'Harry John',
            'picture': '/public/assets/g/imgs/avatar.jpg',
            'designation': 'Sr Analyst, EMC Inc, IL, USA',
            'bio': 'Met my aggressive timeline requirement with very good quality. Worked with me to come up with a viable solution to meet the timeline. Easy to work with and have the customers best interest in mind. You can find less expensive alternatives but the quality and responsiveness is well worth the price',
            'email': 'vincent@csc.com',
            'telephone': '+555 555 555'
        }, {
            'name': 'Jayne Smith',
            'picture': '/public/assets/g/imgs/avatar.jpg',
            'designation': 'Sr Analyst, EMC Inc, IL, USA',
            'bio': 'Met my aggressive timeline requirement with very good quality. Worked with me to come up with a viable solution to meet the timeline. Easy to work with and have the customers best interest in mind. You can find less expensive alternatives but the quality and responsiveness is well worth the price',
            'email': 'vincent@csc.com',
            'telephone': '+555 555 555'
        }, {
            'name': 'Rossy Hall',
            'picture': '/public/assets/g/imgs/avatar.jpg',
            'designation': 'Sr Analyst, EMC Inc, IL, USA',
            'bio': 'Met my aggressive timeline requirement with very good quality. Worked with me to come up with a viable solution to meet the timeline. Easy to work with and have the customers best interest in mind. You can find less expensive alternatives but the quality and responsiveness is well worth the price',
            'email': 'vincent@csc.com',
            'telephone': '+555 555 555'
        }]
    }];

    $scope.collapseDiv = function(index, text){
        var ele = angular.element(document.getElementById(text + index));
        ele.toggle();
        var status = window.getComputedStyle(ele[0], null).getPropertyValue("display");
        if(status === "block"){
            ele.prev().addClass('chevron-down-arrow');
        } else if(status === "none") {
            ele.prev().removeClass('chevron-down-arrow');
        }
    };
});