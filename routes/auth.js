var constants 			= require('../scripts/constants');
var secure 		= require(constants.paths.scripts + '/secure');

var auth = {

	isLoggedIn: function (req, res, next) {

    if (req.isAuthenticated()){
      console.log("authenticated!!!")
      if ((req.url.indexOf('admin') >= 0 && secure.isInAnyGroups(req.user,"admin") == true) ||
          (req.url.indexOf('admin') < 0)){
        console.log("authorized");
        return next();
      }
      else
      {
        console.log("not authorized!!!")
        res.status(403).send("Unauthorized");
        res.redirect('/Unauthorized');
        return next();
      }
    }


    // A simple detour for token access
    // Application can access token after login to connect with API
    if(req.url.indexOf('/token') > -1)
        res.status(404).send("Not Found");
    else{
      res.redirect('/login?' + req.path);
    }

	}
};


module.exports = auth;
