
var constants					= require('../../scripts/constants');

var logger = require(constants.paths.scripts + '/logger');
var util = require(constants.paths.scripts + '/util');
var userService           = require(constants.paths.services +  '/users');
var menuBuilder = require(constants.paths.scripts + '/menuBuilder');
var secure = require(constants.paths.scripts + '/secure');

require(constants.paths.scripts + '/database');

// var userId = "A02234567892345678900031"; //vManager
// var userId = "A02234567892345678900025"; //client
// var userId = "A02234567892345678900026"; //exec
var userId = "A02234567892345678900003"; 

userService.getOneById(userId)
	.then(function(thisUser){
		if(thisUser){
			// call service with this user
			logger.writeLine('',0,"User: " + thisUser.name.first + ' ' + thisUser.name.last);
			logger.writeLine('',0,"User: " + thisUser.email);
			logger.writeLine('',0,"member of " + secure.getGroups(thisUser));

			// if( secure.isInAnyGroups(thisUser, "customer"))	{
			// 			logger.writeLine('' , 2,"Found customer!!!");
			// 		}
			// 		else if(secure.isInAnyGroups(thisUser, "exec")){
			// 					logger.writeLine('', 2,"Found exec!!!");
			// 		}
			// 		else if(secure.isInAnyGroups(thisUser, "vManager")){
			// 					logger.writeLine('', 2,"Found vManager!!!");
			// 		}
			// 		else if( secure.isInAnyGroups(thisUser, "user")){
			// 			logger.writeLine('' , 2, "Found user!!!");
			// 		}

			var script =  menuBuilder.getMenu(thisUser, "side");
			console.log(script)
		}
		console.log("execution complete");
})
.catch(function (err){
		console.log("exception" + err);
});
