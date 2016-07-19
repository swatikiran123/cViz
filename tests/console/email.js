
console.log("cViz Testing Script - email notifications");
console.log();

var mongoose = require('mongoose');

var constants       = require('../../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger					= require(constants.paths.scripts + "/logger");
var secure					= require(constants.paths.scripts + "/secure");
var emailController					= require(constants.paths.scripts + "/email");
var userService           = require(constants.paths.services +  '/users');
var visitService           = require(constants.paths.services +  '/visits');

require(constants.paths.scripts + '/database'); // load database management scripts
var emails = [];

var visitId = "578dc230aa260e0caeaa999a";
console.log("Running with visit id " + visitId);
try{
	//emailController.inviteAttendees(visitId, 'http://localhost:8080');
	//emailController.agendaFinalize(visitId, 'http://localhost:8080');
	emailController.getAgenda(visitId,'http://localhost:8080');
}
catch(err){
	console.log(err.stack);
}
