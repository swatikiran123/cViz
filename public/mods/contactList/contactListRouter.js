'use strict';

angular.module('contactList')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      
      .when('/contactlist/list', {
        templateUrl: '/public/mods/contactList/contactListViewMain.html',
        controller: 'contactListControllerMain'
      })

      .when('/city/', {
        templateUrl: '/public/mods/contactList/contactListViewShow.html',
        controller: 'contactListControllerMain'
      })

      .when('/:id/showcontactList', {
        templateUrl: '/public/mods/contactList/contactListViewShow.html',
        controller: 'contactListControllerMain'
      });

      // .when('/:id/editFact', {
      //   templateUrl: '/public/mods/contactList/contactListViewAdd.html',
      //   controller: 'contactListControllerMain'
      // });


    }
  ]);
