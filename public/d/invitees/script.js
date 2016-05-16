

angular.module('inviteesDirective', [])
.controller('inviteesDirectiveControllerMain', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  console.log($scope.switchMode);
  
  $scope.small= "small";
  $scope.large= "LARGE";
  $scope.medium= "medium";
  if($scope.switchMode == 'add')
  {  
    $scope.arraydata=[];
  }

  $scope.array=[];
  $scope.invite='';
  var j=[];

  $scope.addInvitees=function(invite){

    $http.get('/api/v1/secure/admin/users/email/' + invite).success(function(response) {
     if(response.association == "employee" || (response.association == "customer" && response.orgRef == $scope.userType))
     {
       if(response.memberOf == null || response.memberOf == undefined || response.memberOf == "" )
       {
         $scope.userId = response._id;

         $scope.array.push({
          invite: $scope.userId,
        });

         $scope.checked = false;

         for (var i =0 ;i<$scope.array.length;  i++) {
           j =$scope.array[i].invite; 
         };

         $scope.arraydata.push(j);
       }
       else {
        $scope.checked = true;
        $scope.message = "User is not an organization employee!!";
        $timeout(function () { $scope.message = ''; }, 3000);
      }
    }

    else {
      $scope.checked = true;
      $scope.message = "User is not an organization employee!!";
      $timeout(function () { $scope.message = ''; }, 3000);
    }
    
    $scope.invite='';

  })

    .error(function(response, status){
      if(status===404)
      {
        $scope.checked = true;
        $scope.message = "User not found !!!";
        $timeout(function () { $scope.message = ''; }, 3000);
      }
      else
        console.log("error with user directive");
    });


  };//end of addInvitees

  $scope.removeInvitees = function(index){
    console.log(index);
    $scope.array.splice(index, 1);
  };

  $scope.removeInviteesdata = function(index){
    console.log(index);
    $scope.arraydata.splice(index, 1);
  };

}])

.directive('invitees', function() {
  return {
    controller: 'inviteesDirectiveControllerMain',
    templateUrl: '/public/d/invitees/templates/invitee.html',
    scope: {
      arraydata: "=arraydata",
      switchMode: "=switchMode",
      userType: "@userType"
    },

    link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){

        var viewmode = scope.viewType;//.toLowerCase();

        if(viewmode === "small" && scope.userEmail!="")
        {
          return "/public/d/invitees/templates/smallpanel.html";
        }

      }
    }


  };
});
