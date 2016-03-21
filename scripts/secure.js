var constants       = require('../scripts/constants');
var util						= require(constants.paths.scripts + "/util");
var logger					= require(constants.paths.scripts + "/logger");

var secure = {};

secure.isInAnyGroups = isInAnyGroups;

module.exports = secure;

var groups = {										// constants defining the application paths
    'admin'										: 'A20484567892345678900001',
    'exec'										: 'A20484567892345678900002',
    'vManager'								: 'A20484567892345678900003'
};

function isInAnyGroups(user, grps){

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
		//logger.writeLine('predefined groups', 'debug', 0);
		if(groups[grp] !== undefined){
			// logger.writeLine("Checking for " + grp + " : " + groups[grp], 'debug', 1);
			user.memberOf.forEach(function(member){
				member = ""+ member;
				// logger.writeLine("try " + member, 'debug', 1)
				// if(member.toLowerCase() == groups[grp].toLowerCase()){
				if(member.compare(groups[grp])){
					// logger.writeLine('yes '+grp,'debug',2);
					check = true;
				}
			});
		}
	});

	// extend further for new groups
	//logger.writeLine("unknown group", 'debug', 0);
	return check;
}
