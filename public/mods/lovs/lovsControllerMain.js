'use strict';
var lovsApp = angular.module('lovs', []);

lovsApp.controller('lovsControllerMain', ['$scope', '$http', '$routeParams', 'growl','$rootScope',
  function($scope, $http, $routeParams, growl,$rootScope) {


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


    $http.get('/api/v1/secure/lov/sessionType').success(function(response) {
      $scope.sessionType = response.values;
    // console.log($scope.vertical);
  });



    $scope.addInfluence = function() {
      if ($scope.newInfluenceValue == '' || $scope.newInfluenceValue == undefined)
      {
        growl.error(parse("Please enter a Influence"));
      }
      else
      {
        $scope.influence.push($scope.newInfluenceValue);
        var obj ={} ;
        obj.values = $scope.influence;

        $http.put('/api/v1/secure/lov/influence', obj).success(function(response)
        {
          console.log(response);
          growl.info(parse("New Influence [%s]<br/>added successfully",$scope.newInfluenceValue));
          $scope.newInfluenceValue = '';
        });
      }

    }


    $scope.addRegions = function() {
      if ($scope.newRegionsValue == '' || $scope.newRegionsValue == undefined)
      {
        growl.error(parse("Please enter a Region"));
      }
      else
      {
        $scope.regions.push($scope.newRegionsValue);
        var obj ={} ;
        obj.values = $scope.regions;

        $http.put('/api/v1/secure/lov/regions', obj).success(function(response)
        {
          console.log(response);
          growl.info(parse("New Region [%s]<br/>added successfully",$scope.newRegionsValue));
          $scope.newRegionsValue = '';
        });
      }
    }


    $scope.addLocations = function () {
      if ($scope.newLocationsValue == '' || $scope.newLocationsValue == undefined)
      {
        growl.error(parse("Please enter a Location"));
      }
      else
      {
        $scope.locations.push($scope.newLocationsValue);
        var obj ={} ;
        obj.values = $scope.locations;

        $http.put('/api/v1/secure/lov/locations', obj).success(function(response)
        {
          console.log(response);
          growl.info(parse("New Location [%s]<br/>added successfully",$scope.newLocationsValue));
          $scope.newLocationsValue = '';
        });
      }
    }


    $scope.addOfferings = function () {
      if ($scope.newOfferingsValue == '' || $scope.newOfferingsValue == undefined)
      {
        growl.error(parse("Please enter a Offerring"));
      }
      else
      {
        $scope.offerings.push($scope.newOfferingsValue);
        var obj ={} ;
        obj.values = $scope.offerings;

        $http.put('/api/v1/secure/lov/offerings', obj).success(function(response)
        {
          console.log(response);
          growl.info(parse("New offerings [%s]<br/>added successfully",$scope.newOfferingsValue));
          $scope.newOfferingsValue = '';
        });
      }
    }



    $scope.addContactType = function () {
      if ($scope.newContactTypeValue == '' || $scope.newContactTypeValue == undefined)
      {
        growl.error(parse("Please enter a Contact-Type"));
      }
      else
      {
        $scope.contactType.push($scope.newContactTypeValue);
        var obj ={} ;
        obj.values = $scope.contactType;

        $http.put('/api/v1/secure/lov/contactType', obj).success(function(response)
        {
          console.log(response);
          growl.info(parse("New Contact-type [%s]<br/>added successfully",$scope.newContactTypeValue));
          $scope.newContactTypeValue = '';
        });
      }
    }



    $scope.addVertical = function() {
      if ($scope.newVerticalValue == '' || $scope.newVerticalValue == undefined)
      {
        growl.error(parse("Please enter a Vertical"));
      }
      else
      {
        $scope.vertical.push($scope.newVerticalValue);
        var obj ={} ;
        obj.values = $scope.vertical;

        $http.put('/api/v1/secure/lov/vertical', obj).success(function(response)
        {
          console.log(response);
          growl.info(parse("New Vertical [%s]<br/>added successfully",$scope.newVerticalValue));
          $scope.newVerticalValue = '';
        });
      }
    }


    $scope.addSessionType = function() {
      console.log($scope.newSessionTypeValue);
      if ($scope.newSessionTypeValue == '' || $scope.newSessionTypeValue == undefined)
      {
        growl.error(parse("Please enter a Session-Type"));
      }
      else
      {
        $scope.sessionType.push($scope.newSessionTypeValue);
        var obj ={} ;
        obj.values = $scope.sessionType;

        $http.put('/api/v1/secure/lov/sessionType', obj).success(function(response)
        {
          console.log(response);
          growl.info(parse("New Vertical [%s]<br/>added successfully",$scope.newSessionTypeValue));
          $scope.newSessionTypeValue = '';
        });
      }
    }





    $scope.removeInfluence = function(selectedObjIndex){
      $http.get('/api/v1/secure/lov/influence').success(function(response) {
        $scope.influence = response.values;

        if (selectedObjIndex == null || selectedObjIndex=== undefined || selectedObjIndex === "" || selectedObjIndex === -1)
        {
          growl.error(parse("Please select a Influence to remove"));
        }
        else
        {
          growl.info(parse("Influence [%s]<br/>deleted successfully",$scope.influence[selectedObjIndex]));
          $scope.influence.splice(selectedObjIndex, 1);

          var obj = {};
          obj.values = $scope.influence;

          $http.put('/api/v1/secure/lov/influence', obj).success(function(response)
          {
            console.log(response);
          });
        }
      });
    }



    $scope.removeRegions = function(selectedObjIndex){
      $http.get('/api/v1/secure/lov/regions').success(function(response) {
        $scope.regions = response.values;

        if (selectedObjIndex == null || selectedObjIndex=== undefined || selectedObjIndex === "" || selectedObjIndex === -1)
        {
          growl.error(parse("Please select a Region to remove"));
        }
        else
        {
          growl.info(parse("Region [%s]<br/>deleted successfully",$scope.regions[selectedObjIndex]));
          $scope.regions.splice(selectedObjIndex, 1);

          var obj = {};
          obj.values = $scope.regions;

          $http.put('/api/v1/secure/lov/regions', obj).success(function(response)
          {
            console.log(response);
          });
        }
      });
    }



    $scope.removeLocations = function(selectedObjIndex){
      $http.get('/api/v1/secure/lov/locations').success(function(response) {
        $scope.locations = response.values;

        if (selectedObjIndex == null || selectedObjIndex=== undefined || selectedObjIndex === "" || selectedObjIndex === -1)
        {
          growl.error(parse("Please select a Location to remove"));
        }
        else
        {
          growl.info(parse("Location [%s]<br/>deleted successfully",$scope.locations[selectedObjIndex]));
          $scope.locations.splice(selectedObjIndex, 1);

          var obj = {};
          obj.values = $scope.locations;

          $http.put('/api/v1/secure/lov/locations', obj).success(function(response)
          {
            console.log(response);
          });
        }
      });
    }


    $scope.removeOfferings = function(selectedObjIndex){
      $http.get('/api/v1/secure/lov/offerings').success(function(response) {
        $scope.offerings = response.values;

        if (selectedObjIndex == null || selectedObjIndex=== undefined || selectedObjIndex === "" || selectedObjIndex === -1)
        {
          growl.error(parse("Please select a Offering to remove"));
        }
        else
        {
          growl.info(parse("Offerings [%s]<br/>deleted successfully",$scope.offerings[selectedObjIndex]));
          $scope.offerings.splice(selectedObjIndex, 1);

          var obj = {};
          obj.values = $scope.offerings;

          $http.put('/api/v1/secure/lov/offerings', obj).success(function(response)
          {
            console.log(response);
          });
        }
      });
    }



    $scope.removeContactType = function(selectedObjIndex){
      $http.get('/api/v1/secure/lov/contactType').success(function(response) {
        $scope.contactType = response.values;

        if (selectedObjIndex == null || selectedObjIndex=== undefined || selectedObjIndex === "" || selectedObjIndex === -1)
        {
          growl.error(parse("Please select a Contact-Type to remove"));
        }
        else
        {
          growl.info(parse("Contact-type [%s]<br/>deleted successfully",$scope.contactType[selectedObjIndex]));
          $scope.contactType.splice(selectedObjIndex, 1);

          var obj = {};
          obj.values = $scope.contactType;

          $http.put('/api/v1/secure/lov/contactType', obj).success(function(response)
          {
            console.log(response);
          });
        }
      });
    }




    $scope.removeVertical = function(selectedObjIndex){
      $http.get('/api/v1/secure/lov/vertical').success(function(response) {
        $scope.vertical = response.values;

        if (selectedObjIndex == null || selectedObjIndex=== undefined || selectedObjIndex === "" || selectedObjIndex === -1)
        {
          growl.error(parse("Please select a Vertical to remove"));
        }
        else
        {
          growl.info(parse("Vertical [%s]<br/>deleted successfully",$scope.vertical[selectedObjIndex]));
          $scope.vertical.splice(selectedObjIndex, 1);

          var obj = {};
          obj.values = $scope.vertical;

          $http.put('/api/v1/secure/lov/vertical', obj).success(function(response)
          {
            console.log(response);
          });
        }
      });
    }



    $scope.removeSessionType = function(selectedObjIndex){
      $http.get('/api/v1/secure/lov/sessionType').success(function(response) {
        $scope.sessionType = response.values;

        if (selectedObjIndex == null || selectedObjIndex=== undefined || selectedObjIndex === "" || selectedObjIndex === -1)
        {
          growl.error(parse("Please select a SessionType to remove"));
        }
        else
        {
          growl.info(parse("SessionType [%s]<br/>deleted successfully",$scope.sessionType[selectedObjIndex]));
          $scope.sessionType.splice(selectedObjIndex, 1);

          var obj = {};
          obj.values = $scope.sessionType;

          $http.put('/api/v1/secure/lov/sessionType', obj).success(function(response)
          {
            console.log(response);
          });
        }
      });
    }



    $scope.removeAll = function(val) {
      $http.get('/api/v1/secure/lov/'+val).success(function(response) {

        if(val == 'influence')
        {
          $scope.influence = response.values;
          growl.error(parse("Influence deleted successfully"));
          for (var i = 0; i < $scope.influence.length; i++) {
            $scope.influence.splice(i);
            var obj = {};
            obj.values = $scope.influence;
          }
        }

        else if(val == 'regions')
        {
          $scope.regions = response.values;
          growl.error(parse("Regions deleted successfully"));
          for (var i = 0; i < $scope.regions.length; i++) {
            $scope.regions.splice(i);
            var obj = {};
            obj.values = $scope.regions;
          }
        }

        else if(val == 'locations')
        {
          $scope.locations = response.values;
          growl.error(parse("Locations deleted successfully"));
          for (var i = 0; i < $scope.locations.length; i++) {
            $scope.locations.splice(i);
            var obj = {};
            obj.values = $scope.locations;
          }
        }

        else if(val == 'offerings')
        {
          $scope.offerings = response.values;
          growl.error(parse("Offerings deleted successfully"));
          for (var i = 0; i < $scope.offerings.length; i++) {
            $scope.offerings.splice(i);
            var obj = {};
            obj.values = $scope.offerings;
          }
        }

        else if(val == 'contactType')
        {
          $scope.contactType = response.values;
          growl.error(parse("Contact-Types deleted successfully"));
          for (var i = 0; i < $scope.contactType.length; i++) {
            $scope.contactType.splice(i);
            var obj = {};
            obj.values = $scope.contactType;
          }
        }

        else if(val == 'vertical')
        {
          $scope.vertical = response.values;
          growl.error(parse("Verticals deleted successfully"));
          for (var i = 0; i < $scope.vertical.length; i++) {
            $scope.vertical.splice(i);
            var obj = {};
            obj.values = $scope.vertical;
            console.log(obj);
          }
        }

        else if(val == 'sessionType')
        {
          $scope.sessionType = response.values;
          growl.error(parse("sessionTypes deleted successfully"));
          for (var i = 0; i < $scope.sessionType.length; i++) {
            $scope.sessionType.splice(i);
            var obj = {};
            obj.values = $scope.sessionType;
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