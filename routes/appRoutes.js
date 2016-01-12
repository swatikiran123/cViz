var constants = require('../config/constants.js');

module.exports = function(app, passport) {

	app.use(function (req, res, next) {
	  console.log('Req @ Time:', Date.now());
	  next();
	});

	require('../app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
	console.log(constants.paths.routes);

}