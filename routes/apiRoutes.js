var constants = require('../config/constants.js');

module.exports = function(app, passport) {

	app.use('/api/app', require('../api/app'));
	app.use('/api/auth', require('../api/auth'));
	//require('../app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
	//console.log(constants.paths.routes);

}