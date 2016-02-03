var session      = require('express-session');

var constants     = require('./constants');
var config        = require(constants.paths.config + '/config');

var sessionSecret   = config.get("db.main");

module.exports = function(app) {
	// initialize session store
	app.use(session({ secret: sessionSecret })); 
}