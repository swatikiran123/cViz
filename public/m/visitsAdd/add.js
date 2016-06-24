
angular.module('visitAdd', ['ngRoute','header','scroll','mgo-angular-wizard','multipleSelect'])

.controller('visitsControllerMain',['$scope', '$http', '$route', '$routeParams','WizardHandler','$rootScope', '$location', '$compile', '$timeout', 
  function($scope, $http, $route, 
    $routeParams,WizardHandler,$rootScope, $location, $compile, $timeout) {
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
    $scope.saveDraf=false;
    $scope.visitsId= "";
    $scope.createBy="";
    $scope.clientIdData="";
    $scope.regions="";
    $scope.status="";

  //offerings - Http get for drop-down
  $http.get('/api/v1/secure/lov/offerings').success(function(response) {
    $scope.offerings=response.values;
  });

  //Location - Http get for drop-down
  $http.get('/api/v1/secure/lov/locations').success(function(response) {
    $scope.location=response.values;
  });
    //regions - Http get for drop-down
    $http.get('/api/v1/secure/lov/regions').success(function(response) {
      $scope.regions=response.values;
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

        $http.get('/api/v1/secure/visits/' + id).success(function(response){

          $scope.visitsId= response._id;
          $scope.status= response.status;

          $scope.createBy= response.createBy._id;
          $scope.clientIdData=response.client._id;
          $scope.parentSelected= response.client.name;
          $scope.childSelected= response.client.subName;
          var visits = response;
          visits.regions= response.client.regions;
          visits.selectedList = response.offerings;
          // console.log(visits.regions);
          $http.get('/api/v1/secure/clients/id/' +$scope.clientIdData).success(function(response) {
            // console.log(response.regions);
            $scope.regions=response.regions;
          })

        })
        break;

      }
    }
    refresh();


    $scope.save=function(visits,status){
      if (visits != undefined){
       // console.log(status);
       if (visits != undefined) {

         visits.offerings = visits.selectedList;}
         // console.log(status);
         // console.log($scope.regions);


         var inDataClient={};

         if (visits.clientName!=null) 
         {
           inDataClient.name = visits.clientName;
         }
         if(visits.clientName==null)  
         {
           inDataClient.name = $scope.parentClientString;
         }

         if (visits.subName!=null) 
         {
           inDataClient.subName =visits.subName;
         }
         if(visits.subName==null)  
         {
           inDataClient.subName = $scope.childClientString;
         }

         if (visits.regions!=null) 
         {
           inDataClient.regions =visits.regions;
         }
         if(visits.regions==null)  
         {
           inDataClient.regions = $scope.regions;
         }

         if(inDataClient.name == null)
         {
           inDataClient.name = $scope.parentSelected;
         }

         if(inDataClient.subName == null)
         {
           inDataClient.subName = $scope.childSelected;
         }

         if(inDataClient.industry == null || $scope.industrySelected == null)
         {
           inDataClient.industry = $scope.industrySelected;
         }

         // console.log(inDataClient);
        // console.log(inDataClient.name+" "+inDataClient.subName+" "+inDataClient.regions);
        $http.get('/api/v1/secure/clients/find?query=' + inDataClient.name+"&subQuery="+inDataClient.subName+"&regions="+inDataClient.regions+"&id=").success(function(response) {
         console.log(response);
         if (response.id!= null) {
           visits.client = response.id;

           switch($scope.mode){
             case "add":
             $scope.create(visits);
             break;

             case "edit":             
             $scope.update(visits,status);
             break;

           }
         }
         else if($scope.clientIdData!=undefined && response.id!= null ){
           $scope.visits.clientIdData=$scope.clientIdData;
          // console.log(visits);
          $scope.update(visits,status); 
        }
        else
        {

         var inDataClient ={};

         if (visits.clientName!=null) 
         {
           inDataClient.name = visits.clientName;
         }
         if(visits.clientName==null)  
         {
           inDataClient.name = $scope.parentClientString;
         }

         if (visits.subName!=null) 
         {
           inDataClient.subName =visits.subName;
         }
         if(visits.subName==null)  
         {
           inDataClient.subName = $scope.childClientString;
         }

         if (visits.regions!=null) 
         {
           inDataClient.regions =visits.regions;
         }
         if(visits.regions==null)  
         {
           inDataClient.regions = $scope.regionClientString;
         }
         if(inDataClient.name == null)
         {
           inDataClient.name = $scope.parentSelected;
         }

         if(inDataClient.subName == null)
         {
           inDataClient.subName = $scope.childSelected;
         }

         if(inDataClient.industry == null)
         {
           inDataClient.industry = $scope.industrySelected;
         }

         if(inDataClient.regions == null)
         {
           inDataClient.regions = $scope.regionsSelected;
         }

         if(inDataClient.sfdcid == null)
         {
           inDataClient.sfdcid = $scope.sfdcidSelected;
         }

         if ($rootScope.user.groups.indexOf("admin") > -1 ) {
           inDataClient.status="final";
         }else inDataClient.status="draft";

         $http.post('/api/v1/secure/clients', inDataClient).success(function(response) {
          visits.client = response._id;
          switch($scope.mode){
           case "add":
           $scope.create(visits);
           break;

           case "edit":
           $scope.update(visits,status);
           break;

         }
       })
       }
     })
}
else
{
  $scope.error="All fields are required";
  $timeout(function () { $scope.error = ''; }, 5000);
}     
}
$scope.create = function(visits) {
        // console.log(visits);

        var inData       = visits;
        inData.createBy =  $rootScope.user._id;

        // console.log(inData);

        $http.post('/api/v1/secure/visits', inData).success(function(response) {
          $http.get('/api/v1/secure/email/'+ response._id+'/newvisit').success(function(response) {
          })
          // console.log(response);
          $location.path('/visits/'+response._id+'/edit');
          WizardHandler.wizard().next();
          refresh();
        })
        WizardHandler.wizard().next();

    }; //End of create method
    $scope.update = function(visits,status) {
      refresh();
      // console.log(status);
      // console.log($scope.visits);

      // console.log($scope.createBy);
      // console.log($scope.schedules);
      // console.log($scope.clientIdData);

      var inData  ={};
      inData.createBy = $scope.createBy;//inData.createBy
      inData.client=$scope.clientIdData;
      inData.schedule = $scope.schedules;
      inData.status = status;


      // console.log($scope.visitsId);

      // console.log(inData);

      $http.put('/api/v1/secure/visits/' + $scope.visitsId,  inData).success(function(response) {
       refresh();
       WizardHandler.wizard().next();
     })
      // WizardHandler.wizard().next();

  }; // Update method ends

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
    // console.log(isValid);
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

  }
  ]
  )

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