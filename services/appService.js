var service = {};

service.info = getInfo;

module.exports = service;

var pjson 		= require('../package.json');
var git 		= require('git-rev-sync');
var util 		= require('../scripts/util');

function getInfo(){

    var info = {
        name: pjson.name,
        title: pjson.siteTitle,
        author: pjson.author,
        description: pjson.description,
        version: pjson.version,
        gitHash: git.short()
    };

	return info;
}