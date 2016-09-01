'use strict';

var factsApp = angular.module('facts');

factsApp.controller('factsControllerMain', ['$scope', '$http', '$routeParams','$rootScope' ,'$location', 'growl',
  function($scope, $http, $routeParams,$rootScope ,$location, growl) {

    var id = $routeParams.id;
  // AUtomatically swap between the edit and new mode to reuse the same frontend form

 $scope.mode = "add";

  $scope.hideFilter = true;
  $scope.nameonly= "nameonly";
  $scope.array1 = [];
  $scope.arrayloc = [];
  $scope.array2 = [];
  $scope.array3 = [];
  $scope.array4 = [];
  $scope.array5 = [];
  $scope.array6 = [];
  $scope.array7 = [];
  $scope.array8 = [];
  $scope.array9 = [];
  $scope.array10 = [];
  $scope.array11 = [];
  $scope.array12 = [];                    
    // $scope.uploadFolder = "/loc"
  $scope.callLocFolder = function(loc){
  $scope.uploadFolder = loc;
}
  var refresh = function() {

    $http.get('/api/v1/secure/facts').success(function(response) {

      $scope.factsList = response;
      $scope.facts = "";
      console.log($scope.factsList.length)

      if($scope.factsList.length == 1){
        $scope.mode = "edit";
      }
console.log($scope.mode);
      switch($scope.mode)    {
        case "add":
        $scope.facts = "";
        break;

        case "edit":
 /*       $scope.facts = $http.get('/api/v1/secure/facts').success(function(response){
          $scope.facts = response[0];
      $scope.array1.push(response[0].indiafact);
      $scope.array2.push(response[0].noida);
      $scope.array3.push(response[0].indore);
      $scope.array4.push(response[0].vadadora);
      $scope.array5.push(response[0].mumbai);
      $scope.array6.push(response[0].hyderabad);
      $scope.array7.push(response[0].banglore);
      $scope.array8.push(response[0].chennai);
      $scope.array9.push(response[0].solan);
      $scope.array10.push(response[0].shimoga);
      $scope.array11.push(response[0].gurgaon);
      $scope.array12.push(response[0].pune);  
      $scope.arrayloc.push(response[0].locationfact);
          $scope.facts.startDate = new Date($scope.facts.createdOn);
        })*/

     $scope.facts = $http.get('/api/v1/secure/facts/' + $scope.factsList[0]._id).success(function(response){
          $scope.facts = response;
      $scope.array1.push(response.indiafact);
      $scope.array2.push(response.noida);
      $scope.array3.push(response.indore);
      $scope.array4.push(response.vadadora);
      $scope.array5.push(response.mumbai);
      $scope.array6.push(response.hyderabad);
      $scope.array7.push(response.banglore);
      $scope.array8.push(response.chennai);
      $scope.array9.push(response.solan);
      $scope.array10.push(response.shimoga);
      $scope.array11.push(response.gurgaon);
      $scope.array12.push(response.pune);  
      $scope.arrayloc.push(response.locationfact);
          $scope.facts.startDate = new Date($scope.facts.createdOn);
        });
      } // switch scope.mode ends
    }); // get fact call back ends
  }; // refresh method ends

  refresh();

  $scope.save = function(){
    // set editedBy based on the user picker value
    $scope.facts.editedBy = $rootScope.user._id;
    $scope.facts.indiafact = $scope.array1.toString();
    $scope.facts.locationfact = $scope.arrayloc.toString();
    $scope.facts.noida = $scope.array2.toString();
    $scope.facts.indore = $scope.array3.toString(); 
    $scope.facts.vadodora = $scope.array4.toString();
    $scope.facts.mumbai = $scope.array5.toString();
    $scope.facts.hyderabad = $scope.array6.toString();
    $scope.facts.banglore = $scope.array7.toString();
    $scope.facts.chennai = $scope.array8.toString();
    $scope.facts.solan = $scope.array9.toString(); 
    $scope.facts.gurgaon = $scope.array10.toString();
    $scope.facts.pune = $scope.array11.toString(); 

        
    console.log( $scope.facts.indiafact);

    switch($scope.mode)    {
      case "add":
      $scope.create();
      break;

      case "edit":
      $scope.update();
      break;
      } // end of switch scope.mode ends

      $location.path("facts/list");
  } // end of save method

  $scope.create = function() {
    $http.post('/api/v1/secure/facts', $scope.facts).success(function(response) {
      refresh();
      growl.info(parse("fact [%s]<br/>Added successfully"));
    })
    .error(function(data, status){
      growl.error("Error adding fact");
    }); // http post keynoges ends
  }; // create method ends

  $scope.delete = function(facts) {
    var title = facts.title;
    $http.delete('/api/v1/secure/facts/' + facts._id).success(function(response) {
      refresh();
      growl.info(parse("facts [%s]<br/>Deleted successfully"));
    })
    .error(function(data, status){
      growl.error("Error deleting fact");
    }); // http delete keynoges ends
  }; // delete method ends


  $scope.copy = function(facts) {
    delete facts._id;
    var title = "Copy of " + facts.title;
    facts.title = title;
    $http.post('/api/v1/secure/facts/',facts).success(function(response) {
      refresh();
      growl.info(parse("Fact [%s]<br/>Copied successfully"));
    })
    .error(function(data, status){
      growl.error("Error Copying Fact");
    });
  };

  $scope.update = function() {
    $http.put('/api/v1/secure/facts/' + $scope.facts._id, $scope.facts).success(function(response) {
      refresh();
      growl.info(parse("fact [%s]<br/>Edited successfully"));
    })
    .error(function(data, status){
      growl.error("Error updating fact");
    }); // http put keynoges ends
  }; // update method ends

  $scope.cancel = function() {

    $scope.facts="";
    $location.path("facts/list");
  }

  $scope.getUser = function(){
    console.log($scope.facts.editedBy);

    $http.get('/api/v1/secure/admin/users/' + $scope.facts.editedBy).success(function(response) {
      console.log(response);
      var user = response;
      $scope.facts.editedBy = parse("%s %s, <%s>", user.name.first, user.name.last, user.email);
    });
  }


}])
