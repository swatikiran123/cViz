
console.log("cViz Testing Script - secure");
console.log();

var mongoose = require('mongoose');

var constants       = require('../../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger					= require(constants.paths.scripts + "/logger");
var secure					= require(constants.paths.scripts + "/secure");

var userService           = require(constants.paths.services +  '/users');
var visitService           = require(constants.paths.services +  '/visits');

require(constants.paths.scripts + '/database'); // load database management scripts

var userId = "A02234567892345678900031";  //vManager
var test = "exec,user,admin";

console.log("test for", test);

userService.getOneById(userId)
	.then(function(thisUser){
		if(thisUser){
			console.log(thisUser);

			console.log(secure.isInAnyGroups(thisUser, test));
		}
		else {
			console.log("user not found");
		}
	})
	.catch(function(error){
		console.log(error.stack)
	});



// logic to test getGroups logic
// var userArr = [
//  "A02234567892345678900031", // user
//  "A20474567892345678900001", // admin
//  "A02234567892345678900026", // vm
//  "A02234567892345678900027", // vm
//  "A02234567892345678900029", // exec
//  "A02234567892345678900031", // exec
//  "A02234567892345678900029", // exec
//  "A02234567892345678900031"
// ]; // exec
//
// outArr = [];
// userArr.forEach(function(userId){
// 	console.log("Running with user id " + userId);
//
// 	userService.getOneById(userId)
// 		.then(function(thisUser){
// 			if(thisUser){
// 				console.log(thisUser);
// 				var grp = secure.getGroups(thisUser);
// 				var u ={
// 					id : userId,
// 					mem: thisUser.memberOf,
// 					group: grp
// 				};
// 				outArr.push(u);
// 				console.log(JSON.stringify(u));
// 			}
// 			else {
// 				console.log("user not found");
// 			}
// 		})
// 		.catch(function(error){
// 			console.log("error retriving user", error)
// 		});
// })
//
// console.log("Final output");
// console.log(JSON.stringify(outArr));
