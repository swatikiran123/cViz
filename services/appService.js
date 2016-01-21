var service = {};

service.info = getInfo;

module.exports = service;

var pjson 		= require('../package.json');
var git 		= require('git-rev-sync');
var util 		= require('../scripts/util');

function getInfo(){

    var info = {
        name: pjson.name,
        version: pjson.version,
        gitHash: git.short()
    };

	return info;
}