
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

var visitId = "57a41d4586fb1dc0318bbb1e";
console.log("Running with visit id " + visitId);
try{
	// emailController.inviteAttendees(visitId, 'http://localhost:8080');
	//emailController.agendaFinalize(visitId, 'http://localhost:8080');
	// emailController.getAgenda(visitId,'http://localhost:8080');
	// emailController.visitClosure(visitId,'http://localhost:8080');
	// emailController.notifyNewVisit(visitId,'http://localhost:8080');
	// emailController.notifyVisitOwnerChange(visitId, 'msmith00991@gmail.com');
	// emailController.welcomeClient(visitId,'http://localhost:8080');
	// emailController.rejectVisitByAdmin(visitId);
	emailController.newvManagerAssigned(visitId);
	// emailController.newsecvManagerAssigned(visitId);


}
catch(err){
	console.log(err.stack);
}
