
console.log("cViz Testing Script - Secure");
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


var visitId = "a01234567892345678900006";
console.log("Running with visit id " + visitId);
try{
emailController.welcomeClient(visitId);
}catch(err){
	console.log(err);
}

// visitService.getOneById(visitId)
// 	.then(function(visit){
// 		// console.log(visit);
// 		console.log("sending notifications")
// 		emailController.welcomeClient(visit);
// 	})
// 	.catch(function(err){
// 		console.log("error");
// 		console.log(err.stack);
// 	})
