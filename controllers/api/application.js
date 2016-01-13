var constants					= require('../../scripts/constants');
var appInfoServ 			= require(constants.paths.services + '/appService');

var application = {

	info: function (req, res) {

		
		var appInfo = appInfoServ.info();

	    if (appInfo) {
	        res.send(appInfo);
	    } else {
	        res.status(404).send();
	    }
	}
};

module.exports = application;