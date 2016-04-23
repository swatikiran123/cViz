
console.log("cViz Testing Script - Exec Bios");
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

visitService.getParticipantsById(visitId)
	.then(function(data){
		if(data){
			//logger.writeJson('debug',0,data);
			console.log(data);
		}else{
			logger.writeLine('debug',0,'No exec found')
		}
	})
	.catch(function (err){
		logger.writeLine('debug',1,err)
		console.log(err.stack);
	})

console.log();
console.log("execution complete!!!");
