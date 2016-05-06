
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
        console.log("im in add");
        $scope.visits = "";
        break;

        case "edit":
        $scope.back= true;
        console.log("im in edit mode: "+id);
        $scope.visits = $http.get('/api/v1/secure/visits/' + id).success(function(response){
          console.log(response);
          var visits = response;
        $scope.clientName= response.client.name;//auto fill with reff client db
        $scope.visitors = visits.visitors;
        $scope.schedules = visits.schedule;//List of schedules

        if ($scope.schedules != undefined || $scope.schedules == "")
        {
          $scope.subdis= false;
        }else{
          $scope.subdis= true;}
          $scope.status= visits.status;
          if (visits.billable == "billable") {
            $scope.checked=true;
          };
          $scope.visits = visits;//Whole form object
          console.log($scope.visits._id);


        })
      }
    }
    refresh();


    $scope.save=function(visits,clientId,clientName,checked){

   // console.log(clientId);
   console.log(checked)
   if (checked == false){
    $scope.unbillable= "non-billable";
    if(visits.wbsCode!=null){visits.wbsCode= null;}
    visits.billable=$scope.unbillable;
      }//check code
      else{
        $scope.billable= "billable";
        if(visits.chargeCode!=null){visits.chargeCode= null;}
        visits.billable=$scope.billable;
        }//WBS code

        if (clientId!= null) {
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
          }else{
            console.log(visits);
            visits.title = angular.element('#name').val();
            visits.agenda = angular.element('#agenda').val();
            console.log($scope.visits);
            $http.put('/api/v1/secure/visits/' + $scope.visits._id,  visits).success(function(response) {
              $location.path('/visits/'+$scope.visits._id+'/edit');
              refresh();

            })}
          }
          else
          {
            $http.get('/api/v1/secure/clients/find/name/'+clientName).success(function(response) {
              console.log(response);
              $scope.clientVist=response._id;visits.client = $scope.clientVist;
              visits.createBy= $rootScope.user._id;
              console.log(visits);
              // console.log($scope.back);
              if($scope.back== false){
                $http.post('/api/v1/secure/visits', visits).success(function(response) {
                  $http.get('/api/v1/secure/email/'+ response._id+'/newvisit').success(function(response) {
                   console.log(response);
                 })
                  refresh();
                  $scope.visitId=response._id;
                  $location.path('/visits/'+$scope.visitId+'/edit');

                })
              }else{

                console.log(visits);

                visits.title = angular.element('#name').val();
                visits.agenda = angular.element('#agenda').val();
                console.log($scope.visits);
                $http.put('/api/v1/secure/visits/' + $scope.visits._id,  visits).success(function(response) {
                  $location.path('/visits/'+$scope.visits._id+'/edit');
                  refresh();

                })}
              })}
}
$scope.backcheck=function(){
  $scope.back= true;
}

$scope.isDataValid=function(schedule){
  console.log(schedule);
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
  $scope.subdis= false;
  if(isValid === "OK"){
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
    console.log(isValid);
    $scope.err = isValid;
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

  console.log(visitorDef);
  console.log(visitorDef.visitor);

  console.log($scope.visits.client._id);
  $http.get('/api/v1/secure/admin/users/email/' + visitorDef.visitor).success(function(response) {
   if(response.association == 'customer' && response.orgRef == $scope.visits.client._id)
   {
    console.log(response);
    console.log(response._id);//response.association
    console.log(response.association);

    $scope.userId = response._id;

    $scope.visitors.push({
      visitor: $scope.userId,
      influence: influence
    });
    console.log($scope.visitors)
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
    console.log(emailid);
    $scope.showFlag = "notRegisteredUser";
    if(status===404)
    { 
      $scope.disabled = 'false';
      console.log(influencedata);
      $scope.emailId = emailid;
      $scope.influencedata = influencedata;
      console.log($scope.emailId); 
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
  console.log(influencedata);
  console.log(visitor);
  console.log(emailId)
  visitor.email = emailId;
  $scope.disabled = 'true';
  // visitor.local.email = emailId;
  visitor.association = 'customer';
  // visitor.contactNo = $scope.contactNo;
  visitor.orgRef = $scope.visits.client._id;
  $http.post('/api/v1/secure/admin/users/',visitor).success(function(response){
    console.log('POST');
    console.log(response);
  }).then(function() {
    // "complete" code here
    $http.get('/api/v1/secure/admin/users/email/' + visitor.email).success(function(response) {
     console.log('GET') ;
     $scope.userId = response._id;
     $scope.showFlag = "user";
     $scope.visitors.push({
      visitor: $scope.userId,
      influence: influencedata
    });
   });
  });
}

$scope.removevisitor = function(index){
  $scope.visitors.splice(index, 1);
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