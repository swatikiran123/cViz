'use strict';

var profileApp = angular.module('profile');

profileApp.service('multipartForm', ['$http', function($http){
  this.post = function(uploadUrl, data){
    var fd = new FormData();
    for(var key in data)
      fd.append(key, data[key]);
    $http.post(uploadUrl, fd, {
      transformRequest: angular.indentity,
      headers: { 'Content-Type': undefined }
    }).success(function(response){
        });
  }
}]);


profileApp.controller('profileControllerMain', ['$scope', '$http', '$routeParams', '$location', 'growl', '$rootScope', 'Upload', '$timeout','ngDialog',
  function($scope, $http, $routeParams, $location, growl, $rootScope, Upload, $timeout, ngDialog,req) { 
      
      //acts as get user profile by id
      var refresh = function(id) {
      id=$rootScope.user._id;
      $http.get('/api/v1/secure/admin/users/'+id).success(function(response) {
      $scope.user = response;  
      $scope.email = $scope.user.email;
      $scope.facebooktoken = '';
      $scope.twittertoken = '';
      $scope.googletoken = '';
      });
      };refresh();  
      
      //upload the file(url of image) to database with ngFileupload and multer 
      $scope.upload = function (dataUrl) {
          Upload.upload({
              url: '/api/v1/upload/',
              data: {
                  file: Upload.dataUrltoBlob(dataUrl),                
              },
          }).then(function (response) {
            
                $scope.result = response.data;
                $scope.user.avatar=response.data.file.path;   
                $rootScope.cropdataurl=response.data.file.path;             
                $http.post('/api/v1/secure/admin/users/',$scope.user).success(function(response1) {
                });
           });
      };

      //edit the profile picture of user by taking dataurl and user id.
      $scope.editpicture = function (dataUrl,id) {
          id=$rootScope.user._id;
          Upload.upload({
              url: '/api/v1/upload/',
              data: {
                  file: Upload.dataUrltoBlob(dataUrl),                
              },
          }).then(function (response) {
                $scope.result = response.data;
                $scope.user.avatar= '\\' + response.data.file.path;                
                $http.put('/api/v1/secure/admin/users/'+ id, $scope.user).success(function(response1) {
                  window.location.reload();
                });
           });
          ngDialog.closeAll();        
      };  
      
      //edit the profile data user by taking user id.
      $scope.editprofile = function (id) {
          id=$rootScope.user._id;
          $http.put('/api/v1/secure/admin/users/'+ id, $scope.user).success(function(response) {
                window.location.reload();
          });
      };  

      $scope.cancel = function () {       
          ngDialog.closeAll();
      };    

}])

profileApp.controller('MainCtrl', function($scope, ngDialog) {
    $scope.clickToOpen = function () {
        ngDialog.open({ template: 'templateId' });
    };
});

profileApp.controller('AppCtrl', function($scope, $mdDialog, $mdMedia) {
  $scope.status = '  '; 

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/public/mods/profile/profiledialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
     
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  
  };

});

function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

