
console.log("cViz Testing Script - Push Sessions");
console.log();

var mongoose = require('mongoose');

var constants       = require('../../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger					= require(constants.paths.scripts + "/logger");
var visitService           = require(constants.paths.services +  '/visits');
var userService           = require(constants.paths.services +  '/users');

var sessionId = "a06234567892345678900050";
console.log("Running with session id " + sessionId);

require(constants.paths.scripts + '/database'); // load database management scripts

visitService.pushSession(sessionId, 5)
	.then(function(response){
			logger.writeLine('debug',0,response);
			console.log("execution complete!!!");
	})
	.catch(function (err){
		logger.writeLine('debug',0,'Exception occured...')
		logger.writeLine('debug',1,err)
		console.log(err);
	})
