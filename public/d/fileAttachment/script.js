//dropzone directive dropzone.css required,options in controller
angular.module('dropzone', [])

.controller('fileattachmentDirectiveControllerMain', ['$scope', '$http','$mdDialog', '$mdMedia','Upload','growl','$timeout', function($scope, $http, $mdDialog, $mdMedia,Upload,growl,$timeout) {

 var folderType = $scope.folderType;
 var filesize = $scope.fileSize;
 var files = $scope.fileAllowed;
 $scope.array = [];
 $scope.showPanel = false;
 //dropzone configuration for uploading files,files allowed,max File size,acceptedFiles.
 $scope.dropzoneConfig = {
    'options': { // passed into the Dropzone constructor
     'url': '/api/v1/multiupload/' + folderType,
     'maxFilesize': filesize,
     'maxThumbnailFilesize': 10,
     'parallelUploads': 10,
     'autoProcessQueue': true,
     //'addRemoveLinks': true,
     'uploadMultiple': false,
     'maxFiles': files,
      acceptedFiles: ".jpg,.jpeg,.png,.gif,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.mp4,.mkv,.avi,.wmv,.mp3,.wav,.aac"
   },
   'eventHandlers': {
    'sending': function (file, xhr, formData) {
    },
    //event handler for checking the file type and based on file type showing the thumbnail.
    'addedfile': function(file) {
      if (file.type ==='application/msword' || file.type ==='application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type ==='application/vnd.ms-excel.sheet.macroEnabled.12')
        {
          // This is not an image, so Dropzone doesn't create a thumbnail.
          // Set a default thumbnail:
          this.emit("thumbnail", file, "/public/assets/g/imgs/word.png");
          // You could of course generate another image yourself here,
          // and set it as a data url.
        }

        else if (file.type ==='application/vnd.ms-excel' || file.type ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
          this.emit("thumbnail", file, "/public/assets/g/imgs/excel.jpg");
        }

        else if(file.type === 'application/vnd.ms-powerpointtd>' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'){
          this.emit("thumbnail", file, "/public/assets/g/imgs/ppt.png");
        }

        else if (file.type ==='application/pdf'){
          this.emit("thumbnail", file, "/public/assets/g/imgs/pdf.jpg");
        }

        else if (file.type === 'video/mp4' || file.type === 'video/mkv' || file.type === 'video/avi' || file.type === 'video/wmv')
        {
          this.emit("thumbnail", file, "/public/assets/g/imgs/video.png");
        }

        else if (file.type === 'audio/mp3' || file.type === 'audio/wav' || file.type === 'audio/aac')
        {
          this.emit("thumbnail", file, "/public/assets/g/imgs/audio.png");
        }
    },
    'success': function (file, responseText) {
      var filepath = responseText.file.path;
      var imagepath = '/'+ filepath.replace(/\\/g , "/");
      if($scope.fileType == 'singleFile')
      {
      $scope.array.splice(0,1);  
      $scope.array.push(imagepath);
      }

      if($scope.fileType == 'multiFile')
      {
        $scope.array.push(imagepath);
        if($scope.array.length>files)
        { 
          $scope.array.splice(-1,1);
          $scope.message = "Max Files Allowed to attach are:" + files;
          $timeout(function () { $scope.message = ''; }, 10000);
        }
      }
    },


   'removedfile' : function(file) {
      console.log(file.xhr.responseText);
      var jsonObj = JSON.parse(file.xhr.responseText);
      console.log(jsonObj);
    }
  }
};

var dropzoneConfig =$scope.dropzoneConfig; //stroping dropzone configuraton in dropzoneConfig to send into Dialog Box.

$scope.status = '  ';

//event handler for showing the dialog box.
$scope.showUploadButton = function(ev) {
   $mdDialog.show({
    controller: DialogUploadCtrl,
    templateUrl: '/public/d/fileAttachment/templates/fileDialog.html',
    parent: angular.element(document.body),
    locals: { dropzoneConfig: dropzoneConfig },
    //scope: $scope.$new(),
    targetEvent: ev,
    clickOutsideToClose:false

  })
   .then(function(answer) {
    $scope.status = 'You said the information was "' + answer + '".';
  }, function() {
    $scope.status = 'You cancelled the dialog.';
  });

 };


 $scope.removeImageItem = function(index,x){
  $scope.array.splice(index, 1);
  localStorage.removeItem(x);
};

 $scope.viewImageItem = function(x){
  window.open(x,'_blank');
};

$scope.delete = function(index){
  console.log(index)
  console.log($scope.array);
  $scope.array =[];
  console.log($scope.array);
  $mdDialog.hide();
}



}])


.directive('fileattachment',function(){
  return {
    controller: 'fileattachmentDirectiveControllerMain',
    templateUrl: '/public/d/fileAttachment/templates/fileAttachment.html',
    scope: {
      folderType:"@folderType",
      fileSize:"@fileSize",
      fileAllowed:"@fileAllowed",
      array: "=array",
      fileType: "@fileType"
    }
}
})

.directive('dropzone', function () {

  return function (scope, element, attrs) {
    var config, dropzone;

    config = scope[attrs.dropzone];
    // create a Dropzone for the element with the given options
    dropzone = new Dropzone(element[0], config.options);

    // bind the given event handlers
    angular.forEach(config.eventHandlers, function (handler, event) {
      dropzone.on(event, handler);
    });
  };
});

function DialogUploadCtrl($scope, $mdDialog,dropzoneConfig) {
  $scope.dropzoneConfig =dropzoneConfig;
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
