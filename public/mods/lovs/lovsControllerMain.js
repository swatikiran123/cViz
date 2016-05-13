'use strict';
var lovsApp = angular.module('lovs', []);

lovsApp.controller('lovsControllerMain', ['$scope', '$http', '$routeParams', 'growl','$rootScope',
  function($scope, $http, $routeParams, $growl,$rootScope) {


    $http.get('/api/v1/secure/lov/influence').success(function(response) {
      $scope.influence = response.values;
    // console.log($scope.influence);
  });

    $http.get('/api/v1/secure/lov/regions').success(function(response) {
      $scope.regions = response.values;
    // console.log($scope.regions);
  });

    $http.get('/api/v1/secure/lov/locations').success(function(response) {
      $scope.locations = response.values;
    // console.log($scope.locations);
  });

    $http.get('/api/v1/secure/lov/offerings').success(function(response) {
      $scope.offerings = response.values;
    // console.log($scope.offerings);
  });

    $http.get('/api/v1/secure/lov/contactType').success(function(response) {
      $scope.contactType = response.values;
    // console.log($scope.contactType);
  });

    $http.get('/api/v1/secure/lov/vertical').success(function(response) {
      $scope.vertical = response.values;
    // console.log($scope.vertical);
  });



    $scope.addInfluence = function() {
     $scope.influence.push($scope.newInfluenceValue);
     var obj ={} ;
     obj.values = $scope.influence;

     $http.put('/api/v1/secure/lov/influence', obj).success(function(response)
     {
      console.log(response);
      $scope.newInfluenceValue = '';
    });
   }


   $scope.addRegions = function() {
    $scope.regions.push($scope.newRegionsValue);
    var obj ={} ;
    obj.values = $scope.regions;

    $http.put('/api/v1/secure/lov/regions', obj).success(function(response)
    {
      console.log(response);
      $scope.newRegionsValue = '';
    });
  }


  $scope.addLocations = function () {
    $scope.locations.push($scope.newLocationsValue);
    var obj ={} ;
    obj.values = $scope.locations;

    $http.put('/api/v1/secure/lov/locations', obj).success(function(response)
    {
      console.log(response);
      $scope.newLocationsValue = '';
    });
  }


  $scope.addOfferings = function () {
    $scope.offerings.push($scope.newOfferingsValue);
    var obj ={} ;
    obj.values = $scope.offerings;

    $http.put('/api/v1/secure/lov/offerings', obj).success(function(response)
    {
      console.log(response);
      $scope.newOfferingsValue = '';
    });
  }



  $scope.addContactType = function () {
    $scope.contactType.push($scope.newContactTypeValue);
    var obj ={} ;
    obj.values = $scope.contactType;

    $http.put('/api/v1/secure/lov/contactType', obj).success(function(response)
    {
      console.log(response);
      $scope.newContactTypeValue = '';
    });
  }



  $scope.addVertical = function(newVerticalValue) {
    $scope.vertical.push($scope.newVerticalValue);
    var obj ={} ;
    obj.values = $scope.vertical;

    $http.put('/api/v1/secure/lov/vertical', obj).success(function(response)
    {
      console.log(response);
      $scope.newVerticalValue = '';
    });
  }


  $scope.removeInfluence = function(selectedObjIndex){

    $http.get('/api/v1/secure/lov/influence').success(function(response) {
      $scope.influence = response.values;
      $scope.influence.splice(selectedObjIndex, 1);

      var obj = {};
      obj.values = $scope.influence;

      $http.put('/api/v1/secure/lov/influence', obj).success(function(response)
      {
        console.log(response);
      });
    });
  }

  $scope.removeRegions = function(selectedObjIndex){

    $http.get('/api/v1/secure/lov/regions').success(function(response) {
      $scope.regions = response.values;
      $scope.regions.splice(selectedObjIndex, 1);

      var obj = {};
      obj.values = $scope.regions;

      $http.put('/api/v1/secure/lov/regions', obj).success(function(response)
      {
        console.log(response);
      });
    });
  }

  $scope.removeLocations = function(selectedObjIndex){

    $http.get('/api/v1/secure/lov/locations').success(function(response) {
      $scope.locations = response.values;
      $scope.locations.splice(selectedObjIndex, 1);

      var obj = {};
      obj.values = $scope.locations;

      $http.put('/api/v1/secure/lov/locations', obj).success(function(response)
      {
        console.log(response);
      });
    });
  }


  $scope.removeOfferings = function(selectedObjIndex){

    $http.get('/api/v1/secure/lov/offerings').success(function(response) {
      $scope.offerings = response.values;
      $scope.offerings.splice(selectedObjIndex, 1);

      var obj = {};
      obj.values = $scope.offerings;

      $http.put('/api/v1/secure/lov/offerings', obj).success(function(response)
      {
        console.log(response);
      });
    });
  }

  $scope.removeContactType = function(selectedObjIndex){

    $http.get('/api/v1/secure/lov/contactType').success(function(response) {
      $scope.contactType = response.values;
      $scope.contactType.splice(selectedObjIndex, 1);

      var obj = {};
      obj.values = $scope.contactType;

      $http.put('/api/v1/secure/lov/contactType', obj).success(function(response)
      {
        console.log(response);
      });
    });
  }


  $scope.removeVertical = function(selectedObjIndex){

    $http.get('/api/v1/secure/lov/vertical').success(function(response) {
      $scope.vertical = response.values;
      $scope.vertical.splice(selectedObjIndex, 1);

      var obj = {};
      obj.values = $scope.vertical;

      $http.put('/api/v1/secure/lov/vertical', obj).success(function(response)
      {
        console.log(response);
      });
    });
  }



  $scope.removeAll = function(val) {
    $http.get('/api/v1/secure/lov/'+val).success(function(response) {

      if(val == 'influence')
      {
        $scope.influence = response.values;
        
        for (var i = 0; i < $scope.influence.length; i++) {
          $scope.influence.splice(i);
          var obj = {};
          obj.values = $scope.influence;
        }
      }

      else if(val == 'regions')
      {
        $scope.regions = response.values;

        for (var i = 0; i < $scope.regions.length; i++) {
          $scope.regions.splice(i);
          var obj = {};
          obj.values = $scope.regions;
        }
      }

      else if(val == 'locations')
      {
        $scope.locations = response.values;
        
        for (var i = 0; i < $scope.locations.length; i++) {
          $scope.locations.splice(i);
          var obj = {};
          obj.values = $scope.locations;
        }
      }

      else if(val == 'offerings')
      {
        $scope.offerings = response.values;
        
        for (var i = 0; i < $scope.offerings.length; i++) {
          $scope.offerings.splice(i);
          var obj = {};
          obj.values = $scope.offerings;
        }
      }

      else if(val == 'contactType')
      {
        $scope.contactType = response.values;
        
        for (var i = 0; i < $scope.contactType.length; i++) {
          $scope.contactType.splice(i);
          var obj = {};
          obj.values = $scope.contactType;
        }
      }

      else if(val == 'vertical')
      {
        $scope.vertical = response.values;
        
        for (var i = 0; i < $scope.vertical.length; i++) {
          $scope.vertical.splice(i);
          var obj = {};
          obj.values = $scope.vertical;
          console.log(obj);  
        }
      }


      $http.put('/api/v1/secure/lov/' +val, obj).success(function(response)
      {
        console.log(obj);
        console.log(response);
      });

    });


  }

}]);