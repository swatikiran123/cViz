var colors 				= require('colors');
var constants 		= require('../scripts/constants.js');

module.exports = function(app, passport) {

	app.use(function (req, res, next) {
	  console.log('Req @ Time:', Date.now());
	  next();
	});

	//require('../app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
	//console.log(constants.paths.routes);
	//
	app.all('/*', function(req, res, next) {
		console.log(colors.blue("  setting the api configuration params"));
	  // CORS headers
	  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
	  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	  // Set custom headers for CORS
	  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
	  if (req.method == 'OPTIONS') {
	    res.status(200).end();
	  } else {
	    next();
	  }
	});

	// Auth Middleware - This will check if the token is valid
	// Only the requests that start with /api/v1/* will be checked for the token.
	// Any URL's that do not follow the below pattern would be avoided
	
	app.all('/api/v1/secure/*', [require(constants.paths.routes + '/validateRequest')]);

	// include routes here
	app.use('/', require('./apiRoutes'));
	require('../app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

	// If no route is matched by now, it must be a 404
	app.use(function(req, res, next) {
	  var err = new Error('Not Found');
	  err.status = 404;
	  next(err);
	});

}