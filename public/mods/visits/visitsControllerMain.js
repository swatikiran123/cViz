'use strict';

var visitsApp = angular.module('visits');

//Autocompleate - Factory
visitsApp.factory('AutoCompleteService', ["$http", function ($http) {
  return {
    search: function (term) {
      //var client = {name: new RegExp(term, 'i')};
      var maxRecs = 10;
      var fields = ('name _id');
      var sort = ({name:'ascending'});
      return $http({
        method: 'GET',
        url: '/api/v1/secure/clients/find',
        params: { query: term, fields: fields, maxRecs: maxRecs, sort: sort }
      }).then(function (response) {
        return response.data;
      });
    }
  };
}]);
//Autocompleate - Factory
visitsApp.factory('FeedbackService', ["$http", function ($http) {
  return {
    search: function (term) {
      //var client = {title: new RegExp(term, 'i')};
      var maxRecs = 10;
      var fields = ('title _id type');
      var sort = ({title:'ascending'});
      var type = "visit";
      return $http({
        method: 'GET',
        url: '/api/v1/secure/feedbackDefs/find',
        params: { query: term, fields: fields, maxRecs: maxRecs, sort: sort, type: type }
      }).then(function (response) {
        return response.data;
      });
    }
  };
}]);
//Autocompleate - Factory
visitsApp.factory('SessionService', ["$http", function ($http) {
  return {
    search: function (term) {
      //var client = {title: new RegExp(term, 'i')};
      var maxRecs = 10;
      var fields = ('title _id type');
      var sort = ({title:'ascending'});
      var type ="session";
      return $http({
        method: 'GET',
        url: '/api/v1/secure/feedbackDefs/find',
        params: { query: term, fields: fields, maxRecs: maxRecs, sort: sort, type: type }
      }).then(function (response) {
        return response.data;
      });
    }
  };
}]);
//Autocompleate - Factory
visitsApp.factory('KeynoteService', ["$http", function ($http) {
  return {
    search: function (term) {
      //var client = {title: new RegExp(term, 'i')};
      var maxRecs = 10;
      var fields = ('title _id');
      var sort = ({title:'ascending'});
      return $http({
        method: 'GET',
        url: '/api/v1/secure/keynotes/find',
        params: { query: term, fields: fields, maxRecs: maxRecs, sort: sort }
      }).then(function (response) {
        return response.data;
      });
    }
  };
}]);

visitsApp.controller('visitsControllerMain', ['$scope', '$http', '$route', '$routeParams','$rootScope', '$location', 'growl', '$window','$mdDialog', '$mdMedia', '$timeout','Upload', 'AutoCompleteService', 'FeedbackService', 'KeynoteService' , '$filter',
  function($scope, $http, $route, $routeParams, $rootScope, $location, growl, $window ,$mdDialog , $mdMedia ,$timeout, Upload, AutoCompleteService, FeedbackService, SessionService, KeynoteService, $filter) {

    var id = $routeParams.id;

  // AUtomatically swap between the edit and new mode to reuse the same frontend form
  $scope.mode=(id==null? 'add': 'edit');
  $scope.hideFilter = true;
  $scope.checked = false;
  $scope.schedules=[];
  $scope.visitors=[];
  $scope.keynotes=[];
  $scope.small= "small";
  $scope.large= "LARGE";
  $scope.medium= "medium";
  $scope.clientnameonly= "clientnameonly";
  $scope.nameonly= "nameonly";
  $scope.visitid = id;
  $scope.showAvatar = false;
  $scope.arraydata = [];
  $scope.tab=false;
  $scope.anchor='';
  $scope.secondaryVmanager='';
  
  $scope.visitGrid=false;
  $scope.navVisit ='';
  $scope.agendaEdit= false;
  $scope.showKey=false;
  $scope.subdis= true;
  $scope.stdate= true;

  $scope.agendaTab=true;
  $scope.visitorsTab=false;
  $scope.finalizeTab=false;
  $scope.notifyTab=false;
  $scope.visitGrid= false;


  $scope.nextTab = function(data) {
    $location.path('/visits/'+data+'/edit');
    $route.reload();
  };

  var user= $rootScope.user._id; 
  var group = $rootScope.user.memberOf;

  if ($rootScope.user.groups.indexOf("vManager") > -1 || $rootScope.user.groups.indexOf("admin") > -1) {
    $scope.visitGrid= true;
  }

  if ($rootScope.user.groups.indexOf("admin") > -1) {
    $scope.adminInitVman= true;
  }

  //visit manager group- HTTP get for drop-down
  $http.get('/api/v1/secure/admin/groups/vManager/users').success(function(response) {
    $scope.data=response;
  });

  //Location - Http get for drop-down
  $http.get('/api/v1/secure/lov/locations').success(function(response) {
    $scope.location=response.values;
  });

  //Influence - Http get for drop-down
  $http.get('/api/v1/secure/lov/influence').success(function(response) {
    $scope.influence=response.values;
  });

  $scope.visitorId = "";
  $scope.visitor = "";
  $scope.visitorUser =  "";

  $scope.agmId = "";
  $scope.agmEmail = "";
  $scope.agmUser =  "";

  var refresh = function() {

    $scope.setTimeline = function(time){
      $scope.timeline = time;
      // console.log("setting timeline to " + $scope.timeline )
      $scope.visitBatch = $scope.allVisits[$scope.timeline];
    }
    
    $http.get('/api/v1/secure/visits/all/my').success(function(response) {
      $scope.allVisits = response;
      // console.log("after delete :"+$scope.allVisits)
      if($scope.timeline=="" || $scope.timeline===undefined){
        $scope.timeline = "this-week";
        // console.log("no timeline. Set to " + $scope.timeline);
        $scope.visitBatch = $scope.allVisits[$scope.timeline];
      }
      else{
       $scope.timeline = "this-week";
       // console.log("no timeline. Set to " + $scope.timeline);
       $scope.visitBatch = $scope.allVisits[$scope.timeline];
     }
     // console.log(JSON.stringify($scope.visitBatch,null,2));

     $scope.visits = "";
     $scope.schedules=[];
     $scope.visitors=[];
     $scope.keynotes=[];



     switch($scope.mode)    {
      case "add":
      $scope.visits = "";
      break;

      case "edit":
      $scope.visits = $http.get('/api/v1/secure/visits/' + id).success(function(response){
        var visits = response;
        if (visits.anchor!=undefined){
          $scope.anchor = visits.anchor._id;}
          if(visits.secondaryVmanager!=undefined) {
            $scope.secondaryVmanager = visits.secondaryVmanager._id;
          };

          switch(visits.status){
            case "confirm": 
            $scope.agendaTab=true;
            $scope.visitorsTab=true;
            break;

            case "tentative": 
            $scope.agendaTab=true;
            $scope.visitorsTab=true;
            break;

            case "wip":
            if ($rootScope.user.groups.indexOf("vManager") > -1 || $rootScope.user.groups.indexOf("admin") > -1) {
              $scope.finalizeTab= true;
              $scope.agendaTab=true;
              $scope.visitorsTab=true;
              $scope.notifyTab=false;
            }
            else{
             $scope.agendaTab= true;
             $scope.visitorsTab= true;
             $scope.finalizeTab= false;
             $scope.notifyTab= false;
           }
           break;

           case "finalize": 
           if ($rootScope.user.groups.indexOf("vManager") > -1 || $rootScope.user.groups.indexOf("admin") > -1) {
            $scope.finalizeTab= true;
            $scope.agendaTab=true;
            $scope.visitorsTab=true;
            $scope.notifyTab=true;
          }
          else{
           $scope.agendaTab= true;
           $scope.visitorsTab= true;
           $scope.finalizeTab= false;
           $scope.notifyTab= false;
         }
         break;

     //   case "close": 
     //   if ($rootScope.user.groups.indexOf("vManager") > -1 || $rootScope.user.groups.indexOf("admin") > -1) {
     //    $scope.finalizeTab= true;
     //    $scope.agendaTab=true;
     //    $scope.visitorsTab=true;
     //    $scope.notifyTab=true;
     //  }
     //  else{
     //   $scope.agendaTab= true;
     //   $scope.visitorsTab= true;
     //   $scope.finalizeTab= false;
     //   $scope.notifyTab= false;
     // }
     // break;

   };

          $scope.schedules = visits.schedule;//List of schedules
          if ($scope.schedules != undefined || $scope.schedules == "")
          {
            $scope.subdis= false;
          }else{
            $scope.subdis= true;}
          $scope.visitors = visits.visitors;//List of visitors
          $scope.status= visits.status;
          if (visits.billable == "billable") {
            $scope.checked=true;
          };
          $scope.visits = visits;//Whole form object

          $scope.arraydata=response.invitees;
          if (response.agm!=undefined) {
          $scope.agmUser = response.agm;
          $scope.agmEmail = response.agm.email;
          $scope.agmId = response.agm._id;
          }
          $scope.clientName= response.client.name;//auto fill with reff client db
          if (response.feedbackTmpl!=undefined) {
            $scope.feedback= response.feedbackTmpl.title;//auto fill with reff feedback db
          }
          if(response.sessionTmpl!=undefined) {
          $scope.session= response.sessionTmpl.title;//auto fill with reff feedback db
        }

        for (var i =0; i<visits.keynote.length;i++) {
          $scope.keynotes.push({
            note: visits.keynote[i].note._id,
            noteName: visits.keynote[i].note.title, 
            context: visits.keynote[i].context,
            order: visits.keynote[i].order
          });
        };

            // Reformat date fields to avoid type compability issues with <input type=date on ng-model
            $scope.visits.createdOn = new Date($scope.visits.createdOn);
          });
break;

      } // Switch scope.mode ends
    }); // Get visit call back ends
  }; // Refresh method ends

  refresh();

  $scope.save = function(){
    // Set agm based on the user picker value
    $scope.visits.anchor = $scope.anchorman;
    $scope.visits.secondaryVmanager= $scope.vman;
    $scope.visits.agm = $scope.agmId;
    $scope.visits.status =$scope.status;
    $scope.visits.createBy= $rootScope.user._id;
    $scope.visits.invitees = $scope.arraydata;
    $scope.check= true;
    console.log($scope.visits);
    
    if ($scope.checked == false){
      $scope.unbillable= "non-billable";
      if($scope.visits.wbsCode!=null){$scope.visits.wbsCode= null;}
      $scope.visits.billable=$scope.unbillable;}//check code
      else{
        $scope.billable= "billable";
        if($scope.visits.chargeCode!=null){$scope.visits.chargeCode= null;}
        $scope.visits.billable=$scope.billable;}//WBS code

        $scope.visits.feedbackTmpl = $scope.feedbackId;
        $scope.visits.sessionTmpl = $scope.sessionId;

        if ($scope.clientId!= null) {
          $scope.visits.client = $scope.clientId;

          switch($scope.mode){
            case "add":
            $scope.create();
            break;

            case "edit":
            $scope.update();
            $route.reload();
            break;

          }
        }
        else
        {
          $http.get('/api/v1/secure/clients/find/name/'+$scope.clientName).success(function(response) {
            $scope.clientVist=response._id;$scope.visits.client = $scope.clientVist;
            switch($scope.mode){
              case "add":
              $scope.create();
              break;

              case "edit":
              $scope.update();
              $route.reload();
              break;

            }
          })
        }

        } // End of save method

        $scope.create = function() {

          var inData       = $scope.visits;
          inData.schedule = $scope.schedules;
          inData.keynote = $scope.keynotes;
          inData.visitors = $scope.visitors;
          inData.createBy =  $rootScope.user._id;

          $http.post('/api/v1/secure/visits', inData).success(function(response) {

            $http.get('/api/v1/secure/email/'+ response._id+'/newvisit').success(function(response) {
             console.log(response);
           })
            $scope.nextTab(response._id);

            growl.info(parse("visit [%s]<br/>Added successfully", inData.title));
          })
          .error(function(data, status){
            growl.error("Error adding visit");
    }); // Http post visit ends
          
  }; //End of create method

  $scope.delete = function(visits) {
    var title = visits.title;
    $http.delete('/api/v1/secure/visits/' + visits._id).success(function(response) {
      refresh();
      growl.info(parse("visits [%s]<br/>Deleted successfully", title));
    })
    .error(function(data, status){
      growl.error("Error deleting visit");
    }); // Http put delete ends
  }; // Delete method ends

  $scope.update = function() {
    var inData       = $scope.visits;
    inData.keynote = $scope.keynotes;
    $http.put('/api/v1/secure/visits/' + $scope.visits._id,  inData).success(function(response) {
     refresh();
     growl.info(parse("visit [%s]<br/>Edited successfully",  $scope.visits.title));
     
     if ($rootScope.user.groups.indexOf("vManager") > -1 || $rootScope.user.groups.indexOf("admin") > -1) {
      if($scope.agendaTab == true && $scope.agendaEdit == false) {
        if(($scope.status == "confirm" || $scope.status =="tentative") ||( $scope.visitorsTab == true && $scope.check == true && $scope.finall == true && $scope.status == "wip"))
        {
          $location.path("visits/list");
        }else
        $location.path("/visits/"+$scope.visits._id+"/edit"); 
      }
      else if($scope.finalizeTab == true && $scope.finall == true)
      {
        $location.path("visits/list");
      }
      else   $location.path("/visits/"+$scope.visits._id+"/edit"); 
    }

    else if($scope.agendaTab == true && $scope.agendaEdit == false) {
      if($scope.visitorsTab == true && $scope.check == true)
      {
        $location.path("visits/list");
      }else
      $location.path("/visits/"+$scope.visits._id+"/edit"); 
    }




  })
.error(function(data, status){
  growl.error("Error updating visit");
    }); // Http put visit ends
  }; // Update method ends

  $scope.cancel = function() {

    $scope.visits="";
    $location.path("visits/list");
   // window.history.back();
 }

 $scope.getUser = function(){
  $http.get('/api/v1/secure/admin/users/' + inData.agm).success(function(response) {
    var user = response;
    $scope.visits.agm = parse("%s %s, <%s>", user.name.first, user.name.last, user.email); });
}

   //add vmanager
   $scope.AddVmanager=function(){
    $scope.visits.anchor = $scope.anchorman;
    $scope.visits.secondaryVmanager= $scope.vman;
    $scope.visits.status =$scope.status;
    $scope.visits.agm = $scope.agmId;
    $scope.visits.anchor = $scope.anchorman;
    $scope.visits.secondaryVmanager= $scope.vman;
    $scope.visits.createBy= $rootScope.user._id;
    $scope.visits.client = $scope.clientId;
    $scope.visits.invitees = $scope.arraydata;
    $scope.visits.feedbackTmpl = $scope.feedbackId;
    $scope.visits.sessionTmpl = $scope.sessionId;

    $http.put('/api/v1/secure/visits/' + $scope.visits._id, $scope.visits).success(function(response) {
     growl.info(parse("Visit Manager Edited successfully"));
     $scope.nextTab($scope.visits._id);
     $http.get('/api/v1/secure/email/'+ $scope.visits._id+'/visitownerchange').success(function(response) {
      console.log(response);
      growl.info(parse("Email sent on change of visit managers successfully"));
    }) 
   })
  };

  $scope.showNotifie= function(status){

    $scope.status = status;
    $scope.status="finalize";

    $scope.visits.anchor = $scope.anchorman;
    $scope.visits.secondaryVmanager= $scope.vman;
    $scope.visits.status =$scope.status;
    $scope.visits.agm = $scope.agmId;
    $scope.visits.anchor = $scope.anchorman;
    $scope.visits.secondaryVmanager= $scope.vman;
    $scope.visits.createBy= $rootScope.user._id;
    $scope.visits.client = $scope.clientId;
    $scope.visits.invitees = $scope.arraydata;
    $scope.visits.feedbackTmpl = $scope.feedbackId;
    $scope.visits.sessionTmpl = $scope.sessionId;
    var inData       = $scope.visits;
    inData.keynote = $scope.keynotes;

    $http.put('/api/v1/secure/visits/' + $scope.visits._id, inData).success(function(response) {
      growl.info(parse("Planning stage compleated successfully"));
      $scope.nextTab($scope.visits._id);
    })

  }
  $scope.sendAnchor= function(anchor,status){
    $scope.anchorman = anchor;
    if ($scope.notifyTab== true) {
      $scope.status = status;
    }
    else{
      $scope.status = status;
      $scope.status="wip";
    }
  }
  $scope.sendSecVman= function(secondaryVmanager,status){
    $scope.vman = secondaryVmanager;
    if ($scope.notifyTab== true) {
      $scope.status = status;
    }
    else{
      $scope.status = status;
      $scope.status="wip";
    }
  }
  $scope.clientEmail=function(){
    $http.get('/api/v1/secure/email/'+ $scope.visits._id+'/welcomeclient').success(function(response) {
     growl.info(parse("client invitations sent successfully"));
   })
  }
  $scope.inviteEmail=function(){
    $http.get('/api/v1/secure/email/'+ $scope.visits._id+'/inviteeAttendees').success(function(response) {
     growl.info(parse("invitees invitations sent successfully"));
   })
  }

  $scope.closeNotification=function(){
   $location.path("visits/list"); 
 }
  // Visit schedule table
  $scope.addSchedule=function(schedule){
    $scope.subdis= false;
    if(schedule.startDate!= "" && schedule.endDate!="" && schedule.startDate!= undefined && schedule.endDate!= undefined && schedule.location!=undefined && (new Date(schedule.startDate).getTime() <= new Date(schedule.endDate).getTime())){
      $scope.stdate= false;
      $scope.err= false;
      var startDate = moment(schedule.startDate).format('YYYY-MM-DDTHH:mm:ss.SSSS');
      var endDate = moment(schedule.endDate).format('YYYY-MM-DDTHH:mm:ss.SSSS');
      $scope.schedules.push({
        startDate: startDate,
        endDate: endDate,
        location: schedule.location,
        meetingPlace: schedule.meetingPlace
      });
    }
    else {
      $scope.stdate= true;
      $scope.err=true;
      $timeout(function () { $scope.err = ''; }, 5000);}

      schedule.startDate='';
      schedule.endDate='';
      schedule.location='';
      schedule.meetingPlace='';
    };

    $scope.removeSchedule = function(index,schedules){

      $scope.schedules.splice(index, 1);
      if (schedules.length == 0)
      {
        $scope.subdis= true;
      }else{
        $scope.subdis= false;}
      };

    // $scope.editSchedule = function(index,schedule){
    //   $scope.schedule= schedule;
    //   $scope.schedules.splice(index, 1);
    // };
// Visit schedule table end

 // Visit keynote table

 $scope.addkeynote=function(keynoteDef){

  $scope.keynotes.push({
    note: $scope.keynoteId,
    noteName: keynoteDef.noteName, 
    context: keynoteDef.context,
    order: keynoteDef.order
  });

  keynoteDef.noteName='';
  keynoteDef.context='';
  keynoteDef.order='';
};

$scope.removekeynote = function(index){
  $scope.keynotes.splice(index, 1);
};

// $scope.editkeynote = function(index,keynoteDef){
//   $scope.showKey=true;
//   console.log(keynoteDef);
//   $scope.keynoteDef= keynoteDef;
//   $scope.keynotes.splice(index, 1);
// };
// Visit keynote table end

  //adding visitor data if not registered user
  $scope.addvisitordata = function(userdata,emailId,influencedata,avatar)
  {
    $scope.contactNo = [];

    $scope.contactNo.push({
      contactNumber:userdata.contactNumber,
      contactType:userdata.contactType
    })

    if(avatar == '' || avatar == undefined)
    {
      userdata.avatar = '/public/assets/g/imgs/avatar.jpg';
    }  
    if(avatar != '' || avatar !=undefined)
    {  
      userdata.avatar = avatar;
    }
    userdata.email = emailId;
    userdata.local.email = emailId;
    userdata.association = 'customer';
    userdata.contactNo = $scope.contactNo;
    userdata.orgRef = $scope.visits.client._id;
    console.log(userdata);
    $http.post('/api/v1/secure/admin/users/',userdata).success(function(response){
      console.log('POST');
      console.log(response);
    }).then(function() {
    // "complete" code here
    $http.get('/api/v1/secure/admin/users/email/' + userdata.email).success(function(response) {
     console.log('GET') ;
     $scope.userId = response._id;
     $scope.showFlag = "user";
     $scope.visitors.push({
      visitor: $scope.userId,
      influence: influencedata
    });
   });
  });
    $scope.avatar = '/public/assets/g/imgs/avatar.jpg';
  }

  $scope.cancelButton = function(){
    $scope.showFlag = "noUser";
    $scope.message = "";
  };

  // Visit visitor table

  $scope.addvisitor=function(visitorDef){
    $scope.showAvatar = false;
    $scope.showFlag='';
    $scope.message='';
    $scope.emailId = '';
    var influence= visitorDef.influence;
    var emailid = visitorDef.visitorId;
    var influencedata = visitorDef.influence;

    $http.get('/api/v1/secure/admin/users/email/' + visitorDef.visitorId).success(function(response) {
     if(response.association == 'customer' && response.orgRef == $scope.visits.client._id)
     { 
       $scope.userId = response._id;
       $scope.showFlag = "user";
       $scope.visitors.push({
        visitor: $scope.userId,
        influence: influence
      });

       for(var i=0;i<$scope.visitors.length - 1;i++)
       {
        if($scope.userId == $scope.visitors[i].visitor)
        {
          $scope.showFlag = "noUser";
          $scope.message = "Visitor Already Exists , Add Unique Visitor";
          $timeout(function () { $scope.message = ''; }, 3000);
          $scope.visitors.splice($scope.visitors.length - 1, 1);
        }
      }
    }

    else if(response.association !='customer')
    {
      $scope.showFlag = "noUser";
      $scope.message = "User not found";
      $timeout(function () { $scope.message = ''; }, 3000);
    }

    else if(response.orgRef != $scope.visits.client._id)
    {
      console.log($scope.visits.client.name);
      $scope.showFlag = "noUser";
      $scope.message = "User does not belongs to " + $scope.visits.client.name;
      $timeout(function () { $scope.message = ''; }, 3000);
    }
  })

    .error(function(response, status){
      console.log(emailid);
      $scope.showFlag = "notRegisteredUser";
      if(status===404)
      { 
        console.log(influencedata);
        $scope.emailId = emailid;
        $scope.influencedata = influencedata;
        console.log($scope.emailId); 
        $scope.message = "User not found plz register";
      }
      else
        console.log("error with user directive");
    });


    //if not found add visitor-post that and get id
    visitorDef.influence='';
    visitorDef.visitorId='';
    visitorDef.visitor = '';
    visitorDef.visitorUser = '';
  };
  $scope.removevisitor = function(index){
    $scope.visitors.splice(index, 1);
  };

  $scope.editvisitor = function(index,visitorDef){
    $scope.visitorDef = visitorDef;
    $scope.visitors.splice(index, 1);
  };// Visit visitor table end

  //Feedback by Person
  $scope.feedbackbyPerson = function(visitid) {
    $http.get('/api/v1/secure/feedbacks').success(function(response1)
    {
      $scope.feedbackDatalist = $filter('filter')(response1, { visitid: visitid });
    });
  }

  //Feedback By Question
  $scope.feedbackbyQuestion = function(visitid) {
   $http.get('/api/v1/secure/feedbacks').success(function(response1)
   {
    $scope.arrayQuery = [];
    $scope.arrayItem = [];
    $scope.feedbacks = $filter('filter')(response1, { visitid: visitid });
    var feedbackData = $scope.feedbacks;

    for(var i =0;i<feedbackData.length;i++)
    {
      for(var j=0;j<feedbackData[0].item.length;j++)
      {
        $scope.arrayItem.push(feedbackData[i].item[j]);
      }
    }
  });
 }

 var indexedQuestions = [];

 $scope.questionsToFilter = function() {
  indexedQuestions = [];
  return $scope.arrayItem;
}

$scope.filterQuestions = function(item) {
  var questionIsNew = indexedQuestions.indexOf(item.query) == -1;
  if (questionIsNew) {
    indexedQuestions.push(item.query);
  }
  return questionIsNew;
}

// Show Profile Dialog for non-registered users
$scope.showProfileButton = function(ev) {
  $mdDialog.show({
    templateUrl: '/public/mods/visits/profilePictureDialog.html',
    scope: $scope.$new(),
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

$scope.addpicture = function (dataUrl) {
  Upload.upload({
    url: '/api/v1/upload/profilePics',
    data: {
      file: Upload.dataUrltoBlob(dataUrl),
    },
  }).then(function (response) {
    $scope.userdata ='';
    $scope.result = response.data;
    var filepath = response.data.file.path;
    var imagepath = '/'+ filepath.replace(/\\/g , "/");
    $scope.avatar = imagepath;
    $scope.showAvatar = true;
    $mdDialog.hide();
  });

};

$scope.hide = function() {
  $mdDialog.hide();
};
$scope.canceldialog = function() {
  $mdDialog.cancel();
};
$scope.answer = function(answer) {
  $mdDialog.hide(answer);
};
}])

//Autocompleate - Directive '$timeout', function($timeout)
visitsApp.directive("autocomplete", ["AutoCompleteService", "$timeout", function (AutoCompleteService,$timeout) {
  return {
    restrict: "A",              //Taking attribute value
    link: function (scope, elem, attr, ctrl) {
      elem.autocomplete({
        source: function (searchTerm, response) {
          AutoCompleteService.search(searchTerm.term).then(function (autocompleteResults) {
            if(autocompleteResults == undefined || autocompleteResults == ''){
              scope.autoFail=true;
              scope.clientNotFound="Client not found!!!"
              // $timeout(function () { scope.clientNotFound = ''; }, 5000);
            }
            else{
              response($.map(autocompleteResults, function (autocompleteResult) {
                return {
                  label: autocompleteResult.name,
                  value: autocompleteResult.name,
                  id: autocompleteResult._id
                }
              }))
            }
          });
        },
        minLength: 3,
        select: function (event, selectedItem) {
          scope.clientName= selectedItem.item.value;
          scope.clientId= selectedItem.item.id;
          scope.autoFail=false;
          scope.$apply();
          event.preventDefault();
        }
      });
}
};
}]);
//Autocompleate - Directive
visitsApp.directive("feedback", ["FeedbackService", "$timeout", function (FeedbackService,$timeout) {
  return {
    restrict: "A",              //Taking attribute value
    link: function (scope, elem, attr, ctrl) {
      elem.autocomplete({
        source: function (searchTerm, response) {
          FeedbackService.search(searchTerm.term).then(function (autocompleteResults) {
            if(autocompleteResults == undefined || autocompleteResults == ''){
              scope.autoFailfed=true;
              scope.feedbackNotFound="Feedback Template not found!!!"
              // $timeout(function () { scope.feedbackNotFound = ''; }, 5000);
            }else{
              response($.map(autocompleteResults, function (autocompleteResult) {
                return {
                  label: autocompleteResult.title,
                  value: autocompleteResult.title,
                  id: autocompleteResult._id
                }
              }))
            }
          });
        },
        minLength: 4,
        select: function (event, selectedItem) {
          scope.feedback= selectedItem.item.value;
          scope.feedbackId= selectedItem.item.id;
          scope.autoFailfed=false;
          scope.$apply();
          event.preventDefault();
        }
      });
}
};
}]);
//Autocompleate - Directive
visitsApp.directive("session", ["SessionService", "$timeout", function (SessionService,$timeout) {
  return {
    restrict: "A",              //Taking attribute value
    link: function (scope, elem, attr, ctrl) {
      elem.autocomplete({
        source: function (searchTerm, response) {
          SessionService.search(searchTerm.term).then(function (autocompleteResults) {
            if(autocompleteResults == undefined || autocompleteResults == ''){
              scope.autoFailsec=true;
              scope.sessionNotFound="Session Template not found!!!"
            }else{
              response($.map(autocompleteResults, function (autocompleteResult) {
                return {
                  label: autocompleteResult.title,
                  value: autocompleteResult.title,
                  id: autocompleteResult._id
                }
              }))
            }
          });
        },
        minLength: 4,
        select: function (event, selectedItem) {
          scope.session= selectedItem.item.value;
          scope.sessionId= selectedItem.item.id;
          scope.autoFailsec=false;
          scope.$apply();
          event.preventDefault();
        }
      });
    }
  };
}]);
//Autocompleate - Directive
visitsApp.directive("keynote", ["KeynoteService", "$timeout", function (KeynoteService,$timeout) {
  return {
    restrict: "A",              //Taking attribute value
    link: function (scope, elem, attr, ctrl) {
      elem.autocomplete({
        source: function (searchTerm, response) {
          KeynoteService.search(searchTerm.term).then(function (autocompleteResults) {
            if(autocompleteResults == undefined || autocompleteResults == ''){
              scope.autoFailkey=true;
              scope.keynoteNotFound="keynote not found!!!"
            }else{
              response($.map(autocompleteResults, function (autocompleteResult) {
                return {
                  label: autocompleteResult.title,
                  value: autocompleteResult._id,
                  id: autocompleteResult._id
                }
              }))
            }
          });
        },
        minLength: 4,
        select: function (event, selectedItem) {
          // scope.keynoteDef.note= selectedItem.item.label;
          scope.keynoteDef.noteName= selectedItem.item.label;
          scope.keynoteId= selectedItem.item.id;
          scope.autoFailkey=false;
          scope.$apply();
          event.preventDefault();
        }
      });
}
};
}]);
//ui-date picker - Directive
visitsApp.directive('uiDate', function() {
  return {
    require: '?ngModel',
    link: function($scope, element, attrs, controller) {
      var originalRender, updateModel, usersOnSelectHandler;
      if ($scope.uiDate == null) $scope.uiDate = {};
      if (controller != null) {
        updateModel = function(value, picker) {
          return $scope.$apply(function() {
            return controller.$setViewValue(element.datepicker("getDate"));
          });
        };
        if ($scope.uiDate.onSelect != null) {
          usersOnSelectHandler = $scope.uiDate.onSelect;
          $scope.uiDate.onSelect = function(value, picker) {
            updateModel(value);
            return usersOnSelectHandler(value, picker);
          };
        } else {
          $scope.uiDate.onSelect = updateModel;
        }
        originalRender = controller.$render;
        controller.$render = function() {
          originalRender();
          return element.datepicker("setDate", controller.$viewValue);
        };
      }
      return element.datepicker($scope.uiDate);
    }
  };
});