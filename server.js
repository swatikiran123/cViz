// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var expressLayouts = require('express-ejs-layouts')
var favicon = require('serve-favicon');
var helmet = require('helmet');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var colors				= require('colors');
var constants			= require('./scripts/constants');
var config        = require(constants.paths.config + '/config');
var multer = require('multer');

// configuration ===============================================================
require('./scripts/database'); // load database management scripts

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(helmet());      // http header security

app.set('view engine', 'ejs'); // set up ejs for templating
app.set('layout', 'layouts/mmain')

// set development environment configuration
if (app.get('env') === 'development') {
  app.locals.pretty = true;		//render html output with proper formating
}

app.use(expressLayouts);

// required for passport
require('./scripts/session')(app);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//multer for storing the images locally
// app.use(multer({
//  // dest: './uploads/',
//   dest: './public/uploads/profilePics',
//  rename:function(fieldname,filename){
//     return Date.now() + '.jpg';
//   },
//   onFileUploadComplete: function(file) {
//   console.log(file.fieldname + ' uploaded to the ' + file.path);
// }
// }));

//multer for storing images locally and dynamically based on the entity value.
app.use('/api/v1/upload/:entity',multer({
  dest: './public/uploads/',
  rename:function(fieldname,filename){
    return Date.now() + '.jpg';
  },
  changeDest: function(dest, req, res) {
    console.log(req.params.entity);
    dest += req.params.entity;
    return dest;
  },
  onFileUploadComplete: function(file) {
    console.log(file.fieldname + ' uploaded to the ' + file.path);
  }
}));

//multer for storing images locally and dynamically based on the entity value.
app.use('/api/v1/multiupload/:entity',multer({
  dest: './public/uploads/',
  rename:function(fieldname,filename){
   return filename + '_' + Date.now();
  },
  changeDest: function(dest, req, res) {
    console.log(req.params.entity);
    dest += req.params.entity;
    return dest;
  },
  onFileUploadComplete: function(file) {
    console.log(file.fieldname + ' uploaded to the ' + file.path);
  }
}));
// routes ======================================================================
require('./routes/main')(app, passport);

// launch ======================================================================
app.listen(port);

var util = require('./scripts/util');
var appInfoServ = require('./services/appService');

var appInfo = appInfoServ.info();
console.log(colors.blue(util.formatString("\nApplication: %s on %s environment ver %s:%s",
  appInfo.name, config.get("env"), appInfo.version, appInfo.gitHash )));
console.log(colors.blue(util.formatString('   running at port %s', port)));
