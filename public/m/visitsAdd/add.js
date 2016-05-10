
angular.module('visitAdd', ['ngRoute','header','scroll','mgo-angular-wizard'])
.factory('AutoCompleteService', ["$http", function ($http) {
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
}])

.controller('visitsControllerMain',['$scope', '$http', '$route', 'AutoCompleteService', '$routeParams','WizardHandler','$rootScope', '$location', '$compile', '$timeout', 
	function($scope, $http, $route, AutoCompleteService, $routeParams,WizardHandler,$rootScope, $location, $compile, $timeout) {
    $scope.visitId='';
    $scope.schedules=[];
    $scope.back= false;
    $scope.checked = false;
    $scope.clientId;
    $scope.visitors=[];
    $scope.nameonly= "nameonly";
    $scope.disabled = 'true';
    $scope.subdis= true;
    $scope.visvalid= true;
    $scope.agendaTab=true
    $scope.scheduleT=false;
    $scope.orgkeyTT=false;
    $scope.visitorsTab=false;
    $scope.finish=false;


  //Location - Http get for drop-down
  $http.get('/api/v1/secure/lov/locations').success(function(response) {
    $scope.location=response.values;
  });
    //Influence - Http get for drop-down
    $http.get('/api/v1/secure/lov/influence').success(function(response) {
      $scope.influence=response.values;
    });
    var id = $routeParams.id;
    var refresh = function() {

      $scope.mode=(id==null? 'add': 'edit');
      switch($scope.mode)    {
        case "add":
        $scope.visits = "";
        break;

        case "edit":
        $scope.back= true;
        $scope.visits = $http.get('/api/v1/secure/visits/' + id).success(function(response){
          // console.log(response);
          var visits = response;
        $scope.clientName= response.client.name;//auto fill with reff client db
        $scope.visitors = visits.visitors;
        if ($scope.visitors.length == 0)
        {
          $scope.visvalid= true;

        }
        else{
          $scope.visvalid= false;

        }
        $scope.schedules = visits.schedule;//List of schedules
        if ($scope.schedules.length == 0)
        {
          $scope.subdis= true;

        }
        else{
          $scope.subdis= false;

        }

        $scope.status= visits.status;

        if (visits.billable == "billable" && visits.wbsCode!= null) {
          $scope.checked=true;
        };

          $scope.visits = visits;//Whole form object
          console.log($scope.visits._id);


        })
      }
    }
    refresh();


    $scope.save=function(visits,clientId,clientName,checked){
      if (checked == false){
        $scope.unbillable= "non-billable";
        if($scope.visits.wbsCode!=null){$scope.visits.wbsCode= null;}
      $scope.visits.billable=$scope.unbillable;}//check code
      else if($scope.checked == true || checked == true){
        $scope.billable= "billable";
        if($scope.visits.chargeCode!=null){$scope.visits.chargeCode= null;}
        $scope.visits.billable=$scope.billable;}//WBS code

        var isValidVisit = $scope.isDataValidVisitPre(visits,clientId);
        if(isValidVisit === "OK"){

          if (clientId!= null) {
            WizardHandler.wizard().next();

            if(visits!=undefined)
            {  
              visits.client = clientId;
              visits.createBy= $rootScope.user._id;

            }
            if(visits.mode=="speech")
            { 
              visits.title = angular.element('#name').val();
              visits.agenda = angular.element('#agenda').val();
              visits.client = clientId;
              visits.createBy= $rootScope.user._id;
            }
            console.log(visits);
            if($scope.back== false){

              $http.post('/api/v1/secure/visits', visits).success(function(response) {
                $http.get('/api/v1/secure/email/'+ response._id+'/newvisit').success(function(response) {
                 console.log(response);
               })
                refresh();
                $scope.visitId=response._id;
                $location.path('/visits/'+$scope.visitId+'/edit');

              })
            }

            else{
              console.log(visits);
              visits.title = angular.element('#name').val();
              visits.agenda = angular.element('#agenda').val();
              console.log($scope.visits);
            //function to validate-title,client,agenda,wbs,charge,visitors.
            $http.put('/api/v1/secure/visits/' + $scope.visits._id,  visits).success(function(response) {
              $location.path('/visits/'+$scope.visits._id+'/edit');
              refresh();

            })
          }
          }//end of client id != null
          else if(clientName!=null)
          {
            WizardHandler.wizard().next();

            $http.get('/api/v1/secure/clients/find/name/'+clientName).success(function(response) {
              $scope.clientVist=response._id;
              visits.client = $scope.clientVist;
              visits.createBy= $rootScope.user._id;
              console.log(visits);

              if($scope.back== false){
                //function to validate-title,client,agenda
                $http.post('/api/v1/secure/visits', visits).success(function(response) {
                  $http.get('/api/v1/secure/email/'+ response._id+'/newvisit').success(function(response) {
                   console.log(response);
                 })
                  refresh();
                  $scope.visitId=response._id;
                  $location.path('/visits/'+$scope.visitId+'/edit');

                })
              }
              else{

                console.log(visits);

                visits.title = angular.element('#name').val();
                visits.agenda = angular.element('#agenda').val();
                console.log($scope.visits);
                //function to validate-title,client,agenda,wbs,charge,visitors.
                $http.put('/api/v1/secure/visits/' + $scope.visits._id,  visits).success(function(response) {
                  $location.path('/visits/'+$scope.visits._id+'/edit');
                  refresh();
                  if ($scope.visitorsT==true) {
                    $scope.finish=true;
                  };

                })
              }
            })
}//end of clientname
else{
  $scope.err = "client name not valid";
  $timeout(function () { $scope.err = ''; }, 5000);
}
}

else {
  console.log(isValidVisit);
  $scope.err = isValidVisit;
  $timeout(function () { $scope.err = ''; }, 5000);
}


}
  $scope.checkedBill=function(){
    $scope.checked=true;
  }
    $scope.checkednonBill=function(){
    $scope.checked=false;
  }
$scope.isDataValidVisitPre=function(visits,clientId){

  if ($scope.agendaTab==true) {
    if(visits === "" || visits === undefined || visits === null)
    { 
      return "Data undefined";
    }

    if(visits.title === "" || visits.title === undefined || visits.title === null)
    { 
      return "visits title undefined";
    }
    if(visits.agenda === "" || visits.agenda === undefined || visits.agenda === null)
    { 
      return "visits agenda undefined";
    }
    if(visits.status === "" || visits.status === undefined || visits.status === null)
    { 
      return "visits status undefined";
    }

    if ($scope.scheduleT==true) {
      if ($scope.subdis==true) {
        return "Schedule details undefined";
      }

      if ($scope.orgkeyTT==true) {
        if (visits.billable === "billable" && visits.wbsCode== null) {
          return "billable WBS code undefined";
        }
        if (visits.billable === "non-billable" && visits.chargeCode== null) {
          return "billable Charge code undefined";
        }

        if ($scope.visitorsT==true) {
          if ($scope.visvalid==true) {
            return "visitors details undefined";
          }
        }
      }
    }
  }

  return "OK";

}
$scope.scheduleTab=function(){
  $scope.scheduleT=true;
  $scope.agendaTab=true;
  $scope.orgkeyTT=false;
  $scope.visitorsTab=false;

}
$scope.orgkeyTakeTab=function(){
  $scope.orgkeyTT=true;
  $scope.scheduleT=true;
  $scope.agendaTab=true;
  $scope.subdis= false;

}
$scope.visitVTab=function(){
 $scope.orgkeyTT=true;
 $scope.scheduleT=true;
 $scope.agendaTab=true;
 $scope.visitorsT=true;

}
$scope.backcheck=function(){
  $scope.back= true;
}

$scope.isDataValid=function(schedule){
  var Today = new Date();

  if(schedule === "" || schedule === undefined)
   return "Data undefined";

 if(schedule.startDate === "" || schedule.startDate === undefined || schedule.startDate === null)
  return "Start Date not valid";

if(schedule.endDate === "" || schedule.endDate === undefined || schedule.endDate === null)
  return "End Date not valid";

if(currentDiff(schedule.startDate)<0)
  return "start Date cannot be less than Current Date";

if(DateDiff(schedule.startDate,schedule.endDate)>0)
  return "End Date cannot be less than Start Date";

if(schedule.location === "" || schedule.location === undefined )
  return "Location not valid";

return "OK";
} 

$scope.addSchedule=function(schedule){
  var isValid = $scope.isDataValid(schedule);
  if(isValid === "OK"){
    var startDate = moment(schedule.startDate).format('YYYY-MM-DDTHH:mm:ss.SSSS');
    var endDate = moment(schedule.endDate).format('YYYY-MM-DDTHH:mm:ss.SSSS');
    $scope.subdis= false;
    $scope.schedules.push({
      startDate: startDate,
      endDate: endDate,
      location: schedule.location,
      meetingPlace: schedule.meetingPlace
    });
  }
  else {
    console.log(isValid);
    $scope.err = isValid;
    $scope.subdis= true;
    $timeout(function () { $scope.err = ''; }, 5000);}

    schedule.startDate='';
    schedule.endDate='';
    schedule.location='';
    schedule.meetingPlace='';
    // document.getElementById("location").selectedIndex = "0";
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

$scope.addvisitor=function(visitorDef){

  $scope.showFlag='';
  $scope.message='';
  $scope.emailId = '';
  var influence= visitorDef.influence;
  var emailid = visitorDef.visitor;
  var influencedata = visitorDef.influence;

  $http.get('/api/v1/secure/admin/users/email/' + visitorDef.visitor).success(function(response) {
   if(response.association == 'customer' && response.orgRef == $scope.visits.client._id)
   {
    $scope.userId = response._id;
    $scope.visvalid= false;

    $scope.visitors.push({
      visitor: $scope.userId,
      influence: influence
    });
  }
  else if(response.association !='customer')
  {
    $scope.showFlag = "noUser";
    $scope.message = "User not found";
    $timeout(function () { $scope.message = ''; }, 3000);
  }
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
})
  .error(function(response, status){
    $scope.showFlag = "notRegisteredUser";
    if(status===404)
    { 
      $scope.disabled = 'false';
      $scope.emailId = emailid;
      $scope.influencedata = influencedata;
      $scope.message = "User not found plz register";
    }
    else
      console.log("error with user directive");
  });
  visitorDef.influence='';
  // visitorDef.visitorId='';
  visitorDef.visitor = '';
  // visitorDef.visitorUser = '';
};
$scope.closeNewVisitor=function(){
  $scope.disabled = 'true';
  $scope.showFlag='false';
}
$scope.addvisitordata=function(visitor,emailId,influencedata){
  visitor.email = emailId;
  $scope.disabled = 'true';
  visitor.association = 'customer';
  visitor.orgRef = $scope.visits.client._id;
  $http.post('/api/v1/secure/admin/users/',visitor).success(function(response){
  }).then(function() {
    $http.get('/api/v1/secure/admin/users/email/' + visitor.email).success(function(response) {
     $scope.userId = response._id;
     $scope.showFlag = "user";
     $scope.visvalid=false;
     $scope.visitors.push({
      visitor: $scope.userId,
      influence: influencedata
    });
   });
  });
}

$scope.removevisitor = function(index,visitors){
  $scope.visitors.splice(index, 1);
  if (visitors.length == 0)
  {
     $scope.visvalid=true;
    
  }else{
     $scope.visvalid=false;

  }
};


}])

.directive("autocomplete", ["AutoCompleteService", "$timeout", function (AutoCompleteService,$timeout) {
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
}])
.directive('uiDate', function() {
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
})