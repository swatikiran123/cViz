var constants       = require('../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger					= require(constants.paths.scripts + "/logger");
var groupService					= require(constants.paths.services + "/groups");
var Q               = require('q');

var secure = {};

secure.isInAnyGroups = isInAnyGroups;
secure.getGroups = getGroups;

module.exports = secure;

var groups = {										// constants defining the application paths
    'admin'										: 'A20484567892345678900001',
    'exec'										: 'A20484567892345678900002',
    'vManager'								: 'A20484567892345678900003'
};

function isInAnyGroups(user, grps){
//logger.writeLine("Is in groups " + grps,'debug',0);
	// filter identified groups and user
	var check = false;
	// logger.writeLine("check ??? " + grps, 'debug', 0);
	//return;
	grps.split(",").forEach(function(grp){

		grp = grp.trim();

		if(grp.toLowerCase() == "customer" && user.association == "customer"){
			// logger.writeLine('yes customer','debug',2);
			check = true;
		}

		if (grp.toLowerCase() == "user"){
			// logger.writeLine('yes user','debug',2);
			check = true;
		}

		// check with predefined groups
		//logger.writeLine('debug', 1,'predefined groups');
		if(groups[grp] !== undefined){
			//logger.writeLine('debug', 1,"Checking for " + grp + " : " + groups[grp]);
			user.memberOf.forEach(function(member){
				member = ""+ member;
				//logger.writeLine('debug', 1,"try " + member)
				// if(member.toLowerCase() == groups[grp].toLowerCase()){
				if(member.compare(groups[grp])){
					//logger.writeLine('debug',2,'yes '+grp);
					check = true;
				}
			});
		}
	});

	// extend further for new groups
	//logger.writeLine("unknown group", 'debug', 0);
	return check;
}

function getGroups(user){
	if(user.memberOf == "" || user.memberOf === undefined){
		return "user";
	}

	var grps = [];
	if (arrContains(user.memberOf, groups["admin"]))
		grps.push("admin");

	if(arrContains(user.memberOf, groups["vManager"]))
		grps.push("vManager");

	if(arrContains(user.memberOf, groups["exec"]))
		grps.push("exec");

	return grps.join(',');
}
