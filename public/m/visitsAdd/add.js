
angular.module('visitAdd', ['ngRoute','header','scroll','mgo-angular-wizard','multipleSelect'])

.controller('visitsControllerMain',['$scope', '$http', '$route', '$routeParams','WizardHandler','$rootScope', '$location', '$compile', '$timeout', 
  function($scope, $http, $route, 
    $routeParams,WizardHandler,$rootScope, $location, $compile, $timeout) {

    $scope.schedules=[];
    $scope.visitsId= "";
    $scope.createBy="";
    $scope.clientIdData="";
    $scope.regions="";
    $scope.status="";
    $scope.store="";
    $scope.storetwo="";
    $scope.storeStatus="";
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
    
    $scope.add=function(visits){
      if (visits!= undefined && (visits.clientName != undefined ||  visits.clientName != "" ||  visits.clientName != null) && (visits.subName != undefined || visits.subName != "" ||  visits.subName != null) && visits.regions != undefined) {
        $scope.store=visits;
        WizardHandler.wizard().next();        
      }
      else{
        $scope.error="All fields are required";
        $timeout(function () { $scope.error = ''; }, 5000);
      }
    }
    $scope.addtwo=function(visits,status){
      // console.log(visits)
      if (visits.interest!= undefined && status != undefined && (visits.interest.objective !="" || visits.interest.objective != undefined) && visits.interest.businessType != undefined  && visits.interest.visitType != undefined) {
        $scope.storetwo=visits;
        $scope.storeStatus=status;
        WizardHandler.wizard().next();
      }
      else{
        $scope.error="All fields are required";
        $timeout(function () { $scope.error = ''; }, 5000);
      }
    }
    $scope.save=function(){
      // console.log($scope.store);
      // console.log($scope.storeStatus);
      // console.log($scope.storetwo);
      // console.log($scope.schedules);

      var inDataClient={};

      if ($scope.store.clientName!=null) 
      {
       inDataClient.name = $scope.store.clientName;
     }

     if ($scope.store.subName!=null) 
     {
       inDataClient.subName =$scope.store.subName;
     }
     
     if ($scope.store.regions!=null) 
     {
       inDataClient.regions =$scope.store.regions;
     }

     if(inDataClient.industry == null || inDataClient.industry == undefined || inDataClient.industry == ""){
      inDataClient.industry = "null";
    }

    if(inDataClient.sfdcid == null || inDataClient.sfdcid == undefined || inDataClient.sfdcid == ""){
      inDataClient.sfdcid = "null";
    }

    $http.get('/api/v1/secure/clients/find?query=' + inDataClient.name+"&subQuery="+inDataClient.subName+"&regions="+inDataClient.regions+"&id=").success(function(response) {
     console.log(response);
     //checking if client exists 0r not
     if (response.id!= null) {
       $scope.clientIdData = response.id;
       $scope.create($scope.clientIdData,$scope.store,$scope.storeStatus,$scope.storetwo,$scope.schedules);
     }

     else
     {
      var inDataClient ={};

      if ($scope.store.clientName!=null) 
      {
       inDataClient.name = $scope.store.clientName;
     }

     if ($scope.store.subName!=null) 
     {
       inDataClient.subName =$scope.store.subName;
     }

     if ($scope.store.regions!=null) 
     {
       inDataClient.regions =$scope.store.regions;
     }

      inDataClient.industry = "null";

      inDataClient.sfdcid = "null";

    if ($rootScope.user.groups.indexOf("admin") > -1 ) {
     inDataClient.status="final";
   }else inDataClient.status="draft";

      //Adding client if client dont exists
      $http.post('/api/v1/secure/clients', inDataClient).success(function(response) {
        $scope.clientIdData = response._id;
        $scope.create($scope.clientIdData,$scope.store,$scope.storeStatus,$scope.storetwo,$scope.schedules);
      })
    }
  })
}
$scope.create = function() {
  if ($scope.schedules.length!=0) {
    // console.log($scope.store);
    // console.log($scope.storeStatus);
    // console.log($scope.storetwo);
    // console.log($scope.schedules);
    // console.log($scope.clientIdData);
    // console.log($scope.storetwo.interest.businessType);
    // console.log($scope.storetwo.interest.objective);
    // console.log($scope.storetwo.interest.visitType);

    var inData       = {};
    inData.createBy =  $rootScope.user._id;
    inData.status = $scope.storeStatus;
    inData.client = $scope.clientIdData;
    inData.schedule = $scope.schedules;
    inData.offerings=$scope.store.selectedList;
    inData.interest =$scope.storetwo.interest;

    // console.log(inData);

    $http.post('/api/v1/secure/visits', inData).success(function(response) {
      $http.get('/api/v1/secure/email/'+ response._id+'/newvisit').success(function(response) {
      })
      // console.log(response);
    })
  }else
  {
    $scope.err="Atleast a schedule needed to be added!!";
    $timeout(function () { $scope.err = ''; }, 5000);
  }
    }; //End of create method

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