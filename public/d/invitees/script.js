

angular.module('inviteesDirective', [])
.controller('inviteesDirectiveControllerMain', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  $scope.small= "small";
  $scope.large= "LARGE";
  $scope.medium= "medium";
  if($scope.switchMode == 'add')
  {  
    $scope.arraydata=[];
    $scope.collectlist=[];
  }

  $scope.array=[];
  $scope.invite='';
  var j=[];
  //variables for collecting checkbox

  $scope.collectlistarray=[];
  var l=[];
  $scope.checkFlg='';

  $scope.addInvitees=function(invite){
    var str= String(invite);
    var loc= str.split(/[\s,]+/);
    for (var i = 0; i < loc.length; i++) {     
      $http.get('/api/v1/secure/admin/users/email/' + loc[i]).success(function(response) {
        if(response.association == "employee" || (response.association == "customer" && response.orgRef == $scope.userType))
        {
         $scope.userId = response._id;
         var count=0;

         for (var h = 0; h < $scope.arraydata.length; h++) {
          if ($scope.userId == $scope.arraydata[h]) {
            count++;
          }
        }
        if (count == 0) {
          $scope.array.push({
            invite: $scope.userId,
          });

          $scope.checked = false;

          for (var i =0 ;i<$scope.array.length;  i++) {
           j =$scope.array[i].invite;
         };

         $scope.arraydata.push(j);
       }
       else{
        $scope.checked = true;
        $scope.message = "User already taken!!";
        $timeout(function () { $scope.message = ''; }, 3000);
      }

    // }
    // else {
    //   $scope.checked = true;
    //   $scope.message = "User is not an organization employee!!";
    //   $timeout(function () { $scope.message = ''; }, 3000);
    // }
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
}

  };//end of addInvitees

  $scope.removeInvitees = function(index){
    $scope.array.splice(index, 1);
    $scope.arraydata.splice(index, 1);
    $scope.collectlist.splice(index, 1);
  };

  $scope.removeInviteesdata = function(index){
    $scope.arraydata.splice(index, 1);
    $scope.collectlist.splice(index, 1);

  };

  $scope.collectFeedback = function(feedElg, index,arraydata){
    var place= index;

    $scope.value= feedElg;
    if (arraydata.length!= undefined|| arraydata.length!= 0) {
      for (var i = 0; i < arraydata.length; i++) {
        if (place != i && ($scope.collectlist[i]!= true)) {
          if ($scope.collectlist[i] == false) {
            var data = false;
            $scope.collectlist.splice(i, 1, data);
          }
          if($scope.collectlist[i] == "" || $scope.collectlist[i] == undefined){
            feedElg = false;
            if ($scope.collectlist[i] != false) {
              $scope.collectlist.push(feedElg);}
            }

          }
          if($scope.collectlist.hasOwnProperty(place)){
            if ($scope.value == undefined) {
              feedElg = false;
              $scope.collectlist.splice(place, 1, feedElg);
            }
            else
              $scope.collectlist.splice(place, 1, $scope.value);
          }
          else if (place === i){
            $scope.collectlist.splice(place, 1, $scope.value);

          }

        }
      }
      // console.log($scope.collectlist);
    };

    $scope.up =function(index,arraydata,collectlist){
      var num= index
      var data =arraydata[num];
      var data1= arraydata[num-1];
      arraydata[num-1]= data;
      arraydata[num]=data1;
      if (collectlist!= undefined  || collectlist!= null ) {
        var data2 =collectlist[num];
        var data3= collectlist[num-1];
        collectlist[num-1]= data2;
        collectlist[num]=data3;
      }
    }
    $scope.down =function(index,arraydata,collectlist){
      var num= index
      var data =arraydata[num];
      var data1= arraydata[num+1];
      arraydata[num+1]= data;
      arraydata[num]=data1;
      if (collectlist!= undefined  || collectlist!= null ) {
        var data2 =collectlist[num];
        var data3= collectlist[num+1];
        collectlist[num+1]= data2;
        collectlist[num]=data3;
      }
    }
    $scope.clickUp= function(num,arraydata,index,collectlist){
      if (num-1 == index || num <= 0 || num >arraydata.length) {
        if (num-1 == index ){
          $scope.err= "The position you want to move is existing position!!";
        }
        if (num <= 0 || num >arraydata.length) {
          $scope.err= "The position you want to move currently does not exists!!";
        }

        $timeout(function () { $scope.err = ''; }, 5000);
      }
      else if(index < num){
        var num1= num-1;
        if (num1 - index == 1) {
          $scope.down(index,arraydata,collectlist);
        }
        else{
          var temp1 =0;
          temp1= arraydata[index];
          var temp2 =0;
          if (collectlist!= undefined  || collectlist!= null ) {
            temp2= collectlist[index];
          }
          for (var i = index; i < arraydata.length ; i++) {
            if (i != num1) {
              var t= i+1;
              arraydata[i]= arraydata[t];
              if (collectlist!= undefined  || collectlist!= null ) {
                collectlist[i]= collectlist[t];
              }
            }
            else{
              arraydata[i] = temp1;
              if (collectlist!= undefined  || collectlist!= null ) {
                collectlist[i] = temp2;
              }
              i= arraydata.length;
            }
          }
        }
      }
      else{
        var place = num-1;
        var temp=[];
        var temp1=[];
        var j=0,i=0;
        temp[j]= arraydata[place];
        arraydata[place]=arraydata[index];

        if (collectlist!= undefined  || collectlist!= null ) {
          temp1[j]=collectlist[place];
          collectlist[place]=collectlist[index];
        }
        
        for (i =place+1; i <= arraydata.length; i++) {
          j++;
          if (i!=index) {
            temp[j]= arraydata[i];
            if (collectlist!= undefined  || collectlist!= null ) {
              temp1[j]= collectlist[i];}
              if (temp[j-1] == undefined && (j-1) != -1) {
                j++;
              }
              else{
                arraydata[i]=temp[j-1];
                if (collectlist!= undefined  || collectlist!= null ) {
                  collectlist[i]=temp1[j-1];}
                }
              }
              else{
                arraydata[i]=temp[j-1];
                if (collectlist!= undefined  || collectlist!= null ) {
                  collectlist[i]=temp1[j-1];}
                }

              };
              return [arraydata,collectlist];
            }
          }
        }])

.directive('invitees', function() {
  return {
    controller: 'inviteesDirectiveControllerMain',
    templateUrl: '/public/d/invitees/templates/invitee.html',
    scope: {
      arraydata: "=arraydata",
      switchMode: "=switchMode",
      userType: "@userType",
      collectlist: "=collectlist"
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
