var constants       = require('../scripts/constants');
var _ = require('underscore');
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
	var memberGrps = getGroups(user);

	var inset = [];
	grps.split(',').filter(function(n) {
	    //return memberGrps.indexOf(n) != -1;
			if(memberGrps.indexOf(n) != -1)
				inset.push(n);
	});
	
	return (inset.length > 0)
}

function getGroups(user){

	// first check for customer
	if(user.association == "customer"){
		return "customer";
	}

	// not a member of any group, then user
	if(user.memberOf == "" || user.memberOf === undefined){
		return "user";
	}

	// else go by memberOf
	var grps = [];
	if (arrContains(user.memberOf, groups["admin"]))
		grps.push("admin");

	if(arrContains(user.memberOf, groups["vManager"]))
		grps.push("vManager");

	if(arrContains(user.memberOf, groups["exec"]))
		grps.push("exec");

	return grps.join(',');
}
