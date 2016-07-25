

angular.module('inviteesDirective', [])
.controller('inviteesDirectiveControllerMain', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  // console.log($scope.switchMode);
  
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
        // console.log(response.association);
        if(response.association == "employee" || (response.association == "customer" && response.orgRef == $scope.userType))
        {
       // if(response.memberOf == null || response.memberOf == undefined || response.memberOf == "")
       // {
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
  };

  $scope.removeInviteesdata = function(index){
    $scope.arraydata.splice(index, 1);
  };

  $scope.collectFeedback = function(feedElg, index){
    if($scope.collectlist.hasOwnProperty(index))
      $scope.collectlist.splice(index, 1, feedElg);
    else
      $scope.collectlist.push(feedElg);
  };

  $scope.up =function(index,arraydata){
    var num= index
    var data =arraydata[num];
    var data1= arraydata[num-1];
    arraydata[num-1]= data;
    arraydata[num]=data1;
    // console.log(arraydata[num-1]);
    // console.log(arraydata[num]);
  }
  $scope.down =function(index,arraydata){
    var num= index
    var data =arraydata[num];
    var data1= arraydata[num+1];
    arraydata[num+1]= data;
    arraydata[num]=data1;
    // console.log(arraydata[num+1]);
    // console.log(arraydata[num]);
  }
  $scope.clickUp= function(num,arraydata,index){
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
      // console.log(num);
      // console.log(index);
      var num1= num-1;
      if (num1 - index == 1) {
        $scope.down(index,arraydata);
      }
      else{
        // console.log(arraydata);
        var temp1 =0;
        temp1= arraydata[index];
        for (var i = index; i < arraydata.length ; i++) {
          // console.log("i- "+i+"num1- "+num1)
          if (i != num1) {
            var t= i+1;
            arraydata[i]= arraydata[t];
            // console.log("arraydata["+i+"] - "+arraydata[i])

          }
          else{
            arraydata[i] = temp1;
            // console.log("temp1 "+temp1+", arraydata["+i+"] - "+arraydata[i])
            i= arraydata.length;
          }
        }
        // console.log(arraydata);
      }
    }
    else{
      // console.log(arraydata);
      // console.log(arraydata.length+","+index+","+num)
      var place = num-1;
      var temp=[];
      var j=0,i=0;
      temp[j]= arraydata[place];
      arraydata[place]=arraydata[index];
      // console.log(arraydata[place]+"["+place+"]");
      // console.log(arraydata)

      // console.log(place)
      // var bla = arraydata.length - place;
      // console.log(bla+" place+1="+ place++);
      
      for (i =place+1; i <= arraydata.length; i++) {
        // console.log(i)
        j++;
        if (i!=index) {
          temp[j]= arraydata[i];
          if (temp[j-1] == undefined && (j-1) != -1) {
            j++;
          }
          else{
            arraydata[i]=temp[j-1];
          }
          // console.log("temp[j-1]-  "+temp[j-1]+",  temp-"+temp[j]+"["+j+"], arraydata- "+arraydata[i]+"["+i+"]");
        }
        else{
          // console.log(temp[j-1])
          arraydata[i]=temp[j-1];
          // console.log("at index temp-"+temp[j]+", arraydata- "+arraydata[i]);
        }

      };
      // console.log(arraydata);
      return arraydata;
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
