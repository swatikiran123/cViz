var jwt 						= require('jwt-simple');

var constants 			= require('../scripts/constants');
var users 		= require(constants.paths.services + '/users');
var secure 		= require(constants.paths.scripts + '/secure');

var config        = require(constants.paths.config + '/config');
var authKey 			= config.get("auth.secret");

module.exports = function(req, res, next) {

	// When performing a cross domain request, you will recieve
	// a preflighted request first. This is to check if our the app
	// is safe.

	// We skip the token outh for [OPTIONS] requests.
	//if(req.method == 'OPTIONS') next();

	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
	var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
	console.log(token, ":", key);
	if (token || key) {

			var decoded = jwt.decode(token, authKey);

      // token expiry needs to be checked to implement session logouts
			// if (decoded.exp <= Date.now()) {
			// 	res.status(400);
      //
			// 	res.json({
			// 		"status": 400,
			// 		"message": "Token Expired"
			// 	});
      //
			// 	return;
			// }

			// Authorize the user to see if s/he can access our resources
			// The key would be the logged in user's db id (_id)
      users.getOneById(key)
        .then(function(user){
            if (user){
              var queryStrings = ["groups", "users"];
              var usersGroupPresent = CheckIfAllQueryStringsExist(req.url, queryStrings);

              if ((req.url.indexOf('admin') >= 0 && secure.isInAnyGroups(user,"admin") == true) ||
              (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0) || usersGroupPresent || req.url.includes('/users/email/')
              || req.url.includes('/find/find?query') || req.url.length == 51){
      					next(); // To move to next middleware
              }
              else {
                // Admin level services accessed by non admin user
                res.status(403);
                res.json({
                  "status": 403,
                  "message": "Not authorized"
                });
              }
            }
            else {
              // No user with this name exists, respond back with a 401
      				res.status(401);
      				res.json({
      					"status": 401,
      					"message": "Invalid User"
              });
            }})
        .catch(function (err){
            console.log("exception" + err.stack);
            res.status(500);
            res.json({
              "status": 500,
              "message": "Internal Error"
            });
        });

        function CheckIfAllQueryStringsExist(url, qsCollection) {
        	for (var i = 0; i < qsCollection.length; i++) {
        		if (url.indexOf(qsCollection[i]) == -1) {
        			return false;
        		}
        	}
        	return true;
        }

			// if (dbUser) {
			// 	if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
			// 		next(); // To move to next middleware
			// 	} else {
      //
			// 		res.status(403);
			// 		res.json({
			// 			"status": 403,
			// 			"message": "Not Authorized"
			// 		});
      //
			// 		return;
			// 	}
			// }
      // else {
			// 	// No user with this name exists, respond back with a 401
			// 	res.status(401);
			// 	res.json({
			// 		"status": 401,
			// 		"message": "Invalid User"
			// 	});
			// 	return;
			// }

	}
  else {

		res.status(401);
		res.json({
			"status": 401,
			"message": "Invalid Token or Key"
		});

		return;
	}
};
