

var constants					= require('../../scripts/constants');

var logger = require(constants.paths.scripts + '/logger');
var util = require(constants.paths.scripts + '/util');
var menuBuilder = require(constants.paths.scripts + '/menuBuilder');

var user  = { 
				"_id" : "56e975e592e35cb41543a9e2" ,
				"token" : 
					{ "dateCreated" : "2016-03-15T10:44:33.439Z" ,
						"token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NzAzMDc0NzM0Mzh9.vBaueK15Itq2Nnl4Tm7pbkP2j7NGJQG_gCH3Q3MODHg"
					} ,
				"association" : "employee" , 
				"organization" : "CSC" , 
				"email" : "svema@csc.com" ,
				"memberOf" : 
					[ { 
						"$oid" : "a20484567892345678900002"
					} ] ,
				"status" : "Active" ,
				"local" : 
					{ 
						"email" : "svema@csc.com" , 
						"password" : "$2a$08$ga.qgwHsbrEDcJwNGr3JBuG/J4CqdUq956f8T9nvoMElA5/BqHs2S"
					} ,
				"stats" : 
					{ 	"dateCreated" : { "$date" : 1458038673433} , 
						"dateLastLogin" : { "$date" : 1458115461928}
					} ,
				"contactNo" : [ ] , 
				"socialProfile" : [ ] ,
				"name" : 
					{ 
						"first" : "sankar" , 
						"last" : "vema"
					} , 
				"__v" : 0 , 
				"avatar" : "/public/assets/g/imgs/avatar.jpg"
};

var script = menuBuilder.getMenu(user, "side");

console.log(script);
