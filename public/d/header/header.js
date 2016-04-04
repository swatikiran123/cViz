angular.module('header', []).directive("header", function() {
  return {
     scope: {
     
      showprofile:'@',
      icon:'@',
      title1:'@',
      title2:'@' 
    },

     transclude: true,
    templateUrl: "/public/d/header/header.html",

     link : function(scope,element,attrs)
    {
      scope.getTemplate = function(){

      var showprofile= scope.showprofile.toLowerCase();

       if(showprofile === "true")
       {
        return "/public/d/header/profile.html";
      }
    else{
        return "/public/d/header/title.html";
      }
     

  }  
  }

  };


});