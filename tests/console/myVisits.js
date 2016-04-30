console.log("hello world");
var mongoose = require('mongoose');

var constants       = require('../../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger					= require(constants.paths.scripts + "/logger");
var visitService           = require(constants.paths.services +  '/visits');
var userService           = require(constants.paths.services +  '/users');

require(constants.paths.scripts + '/database'); // load database management scripts

userService.getOneById('a02234567892345678900001')
	.then(function(thisUser){
		if(thisUser){
			// call service with this user
			logger.writeLine('',0,"User: " + thisUser.name.first + ' ' + thisUser.name.last);
			logger.writeLine('',0,"member of " + thisUser.memberOf);
			//visitService.getAll(thisUser, "past,last-week,this-week,today,next-week,further")
			visitService.getMyVisits(thisUser)
				.then(function(data){
						if (data){
							logger.Json(data);
							logger.writeLine('',0,"Proces complete!!! ");
						}else {
								logger.Json("Error getting data");
						}
				})
				.catch(function (err) {
					logger.writeLine("Error " + err);
					console.log(err.stack)
				});
			}
})
  .catch(function (err) {
		logger.writeLine("Error " + err);
		console.log(err.stack)
  });

logger.writeLine("Process completed");
