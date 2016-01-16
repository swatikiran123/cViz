// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3030;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var colors				= require('colors'); 
var constants			= require('./scripts/constants');
var config        = require(constants.paths.config + '/config');

// configuration ===============================================================
mongoose.connect(config.get("db.main")); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

console.log("@server >> " + constants.paths.controllers);
console.log("@server >> " + constants.paths.routes);

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================

//require('./routes/apiRoutes')(app, passport);
require('./routes/main')(app, passport);

//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
//app.use('/api/auth', require('./api/auth')(app,passport));

//app.use('/api/auth', require('./api/auth'));
//app.use('/api/app', require('./api/app'));
//var constants = require('./config/constants');
//console.log("@ server" + constants.paths.routes)

// launch ======================================================================
app.listen(port);

var util = require('./scripts/util');
var appInfoServ = require('./services/appService');

var appInfo = appInfoServ.info();
console.log(colors.blue(util.formatString("\nApplication: %s ver %s:%s", appInfo.name, appInfo.version, appInfo.gitHash )));
console.log(colors.blue(util.formatString('   running at port %s', port)));




