
console.log("cViz Testing Script - Visit Sessions");
console.log();

var mongoose = require('mongoose');

var constants       = require('../../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger					= require(constants.paths.scripts + "/logger");
var visitService           = require(constants.paths.services +  '/visits');
var userService           = require(constants.paths.services +  '/users');

var visitId = "a01234567892345678900006";
console.log("Running with visit id " + visitId);

require(constants.paths.scripts + '/database'); // load database management scripts

visitService.getSessionsById(visitId)
	.then(function(sessions){
		if(sessions){
			logger.writeJson('debug',0,sessions);
		}else{
			logger.writeLine('debug',0,'No sessions found')
		}
	})
	.catch(function (err){
		logger.writeLine('debug',0,'Exception occured...')
		logger.writeLine('debug',1,err)
		console.log(err);
	})

console.log();
console.log("execution complete!!!");
