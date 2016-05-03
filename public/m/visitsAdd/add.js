
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

  //Location - Http get for drop-down
  $http.get('/api/v1/secure/lov/locations').success(function(response) {
    $scope.location=response.values;
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


  $scope.agenda=function(visits,clientId,clientName){
   console.log(clientId);
   console.log("im in create: ")
   if ($scope.checked == false){
    $scope.unbillable= "non-billable";
    if($scope.wbsCode!=null){$scope.wbsCode= null;}
    visits.billable=$scope.unbillable;
      }//check code
      else{
        $scope.billable= "billable";
        if($scope.chargeCode!=null){$scope.chargeCode= null;}
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
      //   $scope.orgKeytake=function(visits){
      //     if ($scope.checked == false){
      //       $scope.unbillable= "non-billable";
      //       if($scope.wbsCode!=null){$scope.wbsCode= null;}
      //       visits.billable=$scope.unbillable;
      // }//check code
      // else{
      //   $scope.billable= "billable";
      //   if($scope.chargeCode!=null){$scope.chargeCode= null;}
      //   visits.billable=$scope.billable;
      //   }//WBS code
      //   var inData=visits;
      //   inData.schedule = $scope.schedules;
      //   $http.put('/api/v1/secure/visits/' + $scope.visitId,  inData).success(function(response) {
      //     console.log(response);
      //   })
      // }

      $scope.addSchedule=function(schedule){
        var x = document.getElementById("location").selectedIndex;
        var y = document.getElementById("location").options;
        schedule.location = y[x].text;
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
          document.getElementById("location").selectedIndex = "0";
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
$scope.finish=function(){
  $scope.msg="succesfully Added a visit";
}

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