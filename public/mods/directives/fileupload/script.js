angular.module('fileuploadDirective', [])
.controller('fileuploadDirectiveControllerMain', ['$scope', '$http','$mdDialog', '$mdMedia','Upload','growl', function($scope, $http, $mdDialog, $mdMedia,Upload,growl) {

  //console.log($scope.folderType);
  var folderType =$scope.folderType;
  console.log(folderType);
  //upload the file(url of image) to database with ngFileupload and multer
  if($scope.folderType === folderType)
  {
  $scope.upload = function (dataUrl) {
    console.log('Upload function');
    // console.log(dataUrl);
     var filedata = Upload.dataUrltoBlob(dataUrl);
     //console.log((filedata.size)/1048576);
     var filesize = (filedata.size)/1048576 //file size in MB
     console.log(filesize);
     if (filesize > 0.6 && filesize < 1) 
     {
     Upload.upload({
      url: '/api/v1/upload/' + folderType,
      data: {
        file: filedata,                
      },
    }).then(function (response) {            
      $scope.result = response.data;
      console.log($scope.result);
      $mdDialog.hide();     
    });
     }
     else if (filesize > 1)
     {
      console.log('File size too big to handle');
      window.alert("Cropped Image too big.Please crop image in a nice dimension.");
     }
     else
     {
      console.log('File size too small to handle');
      window.alert("Cropped Image too small.Please crop image in a nice dimension.");
     }
  };
  } 

  $scope.status = '  '; 

  $scope.showUploadButton = function(ev) {
   // console.log(folderType);
    $mdDialog.show({
      controller: DialogUploadCtrl,
      templateUrl: '/public/mods/directives/fileupload/templates/fileDialog.html',
      locals: { folderType: folderType },
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

}])

.directive('fileupload', function() {
  return {
    controller: 'fileuploadDirectiveControllerMain',
    templateUrl: '/public/mods/directives/fileupload/templates/fileUpload.html',
    scope: {
      folderType:"=folderType"
   },

   link : function(scope,element,attrs)
   {
    scope.getTemplate = function(){

      var foldertype = scope.folderType.toLowerCase();

      if(foldertype === "profilepics")
      {
        return "/public/mods/directives/fileupload/templates/fileProfileUpload.html";
      }
      if(foldertype === "entity"){
        return "/public/mods/directives/fileupload/templates/fileEntityUpload.html";
      }
      if(foldertype === "location"){
        return "/public/mods/directives/fileupload/templates/fileLocationUpload.html";
      }

    }
  }
};
});

function DialogUploadCtrl($scope, $mdDialog ,folderType) {

  $scope.folderType =folderType;
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

