console.log("hello world");
var mongoose = require('mongoose');

var constants       = require('../../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger					= require(constants.paths.scripts + "/logger");
var visitService           = require(constants.paths.services +  '/visits');
var userService           = require(constants.paths.services +  '/users');

// var loginUser = { "_id" : "56e975e592e35cb41543a9e2" , "token" : { "dateCreated" : "2016-03-15T10:44:33.439Z" , "token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NzAzMDc0NzM0Mzh9.vBaueK15Itq2Nnl4Tm7pbkP2j7NGJQG_gCH3Q3MODHg"} , "association" : "employee" , "organization" : "CSC" , "email" : "svema@csc.com" , "memberOf" : [ { "$oid" : "a20484567892345678900002"}] , "status" : "Active" , "local" : { "email" : "svema@csc.com" , "password" : "$2a$08$ga.qgwHsbrEDcJwNGr3JBuG/J4CqdUq956f8T9nvoMElA5/BqHs2S"} , "stats" : { "dateCreated" : { "$date" : 1458038673433} , "dateLastLogin" : { "$date" : 1458115461928}} , "contactNo" : [ ] , "socialProfile" : [ ] , "name" : { "first" : "sankar" , "last" : "vema"} , "__v" : 0 , "avatar" : "/public/assets/g/imgs/avatar.jpg"};
//
// var testVisit = {
// 	title						    : "Critical Test Visit",
// 	client 						  : "A03234567892345678900001",
// 	agenda							: "Customer would like to understand how far we are serious on critical process improvement",
// 	agm								: "A02234567892345678900001",   //sgoud@csc.com
// 	anchor							: "A02234567892345678900002", // spediripatti@csc.com
// 	schedule						: [
// 		{
// 			startDate					: new Date("20 Mar 2016"),//, default: Date.now },
// 			endDate						: new Date("22 Mar 2016"),//, default: Date.now },
// 			location					: "Chennai"  // set of csc locations
// 		},
// 		{
// 			startDate					: new Date("8 Mar 2016"),//, default: Date.now },
// 			endDate						: new Date("9 Mar 2016"),//, default: Date.now },
// 			location					: "Bombai"  // set of csc locations
// 		},
// 		{
// 			startDate					: new Date("15 Mar 2016"),//, default: Date.now },
// 			endDate						: new Date("16 Mar 2016"),//, default: Date.now },
// 			location					: "Bombai"  // set of csc locations
// 		}
// 	],
// 	visitors						: [
// 		{
// 			visitor						: "A02234567892345678900012",  // dtorreto@zurich.com
// 			influence					: "influencer",		// {Decision Maker, Influencer, End User, Others}
// 		},
// 		{
// 			visitor						: "A02234567892345678900013",  // sandresson@zurich.com
// 			influence					: "influencer",		// {Decision Maker, Influencer, End User, Others}
// 		},
// 		{
// 			visitor						: "A02234567892345678900014",  // apenny@telenor.com
// 			influence					: "decision maker",		// {Decision Maker, Influencer, End User, Others}
// 		}
// 	],
// 	interest						: {
// 		businessType			    : "new",		// {new, repeat}
// 		visitType					: "repeat",		// {new, repeat}
// 		objective					: "Critical for CSC to renew the contract for next 5 years"
// 	},
// 	status							: "confirmed",		// {confirmed, tentative, freeze, done}
// 	createBy						: "A02234567892345678900009",
// 	createOn						: new Date("12 Feb 2016")
// };


//logger.writeJson(loginUser);
require(constants.paths.scripts + '/database'); // load database management scripts

// logger.writeJson(testVisit);
//
// visitService.create(testVisit)
//   .then(function () {
//       logger.writeLine("Doc added successfully");
//   })
//   .catch(function (err) {
// 		logger.writeLine("Error creating docment");
//   });

userService.getOneById('A02234567892345678900001')
	.then(function(thisUser){
		if(thisUser){
			// call service with this user
			logger.writeLine('',0,"User: " + thisUser.name.first + ' ' + thisUser.name.last);
			logger.writeLine('',0,"member of " + thisUser.memberOf);
			visitService.getAll(thisUser)
				.then(function(data){
						if (data){
							logger.writeJson(data);
							logger.writeLine('',0,"Docs found: " + data.length);
						}else {
								logger.writeJson("Error getting data");
						}
				})
				.catch(function (err){
						console.log("exception" + err);
				});
			}
})

// logger.writeLine();
// logger.writeLine("All is well", 'debug', 0);
