var constants				= require('../scripts/constants');
var logger 					= require(constants.paths.scripts + '/logger');
var util 					= require(constants.paths.scripts + '/util');
var assetBuilder 			= require(constants.paths.scripts + '/assetBuilder');
var auth 					= require('./auth.js');

module.exports = function(app) {

    var activeLayout = 'layouts/mmain-mobile';

	// route to main module
	app.get('/m/main/', auth.isLoggedIn, function(req, res) {
		res.locals.pageTitle = "Mobile Home";
		res.locals.appName = "ng-app='mviz-main'"
		res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "m-general,m-angular,m-home");
		res.locals.appAssets = assetBuilder.getAssets("appAssets", "m-general,m-angular,m-home");
		res.render('mobile/home.ejs', {
            layout: activeLayout
		});
	});

	// route to facts module
	app.get('/m/facts/', auth.isLoggedIn, function(req, res) {
		res.locals.pageTitle = "Factsheets";
		res.locals.appName = "ng-app='mviz-facts'"
		res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "m-general,m-angular,m-facts");
		res.locals.appAssets = assetBuilder.getAssets("appAssets", "m-general,m-angular,m-facts");
		res.render('mobile/home.ejs', {
            layout: activeLayout
		});
	});

	// route to visits module
	app.get('/m/visits/', auth.isLoggedIn, function(req, res) {
		res.locals.pageTitle = "Visit Agenda";
		res.locals.appName = "ng-app='mviz-visits'"
		res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "m-general,m-angular,m-visits");
		res.locals.appAssets = assetBuilder.getAssets("appAssets", "m-general,m-angular,m-visits");
		res.render('mobile/home.ejs', {
		    layout: activeLayout
		});
	});

    // // show welcome screen
    // app.get('/m/', function(req, res) {
    //     res.locals.pageTitle = "Welcome...";
    //     res.render('mobile/welcome.ejs', {
    //         layout: activeLayout
    //     });
    // });

    // app.get('/m/sessions', function(req, res) {
    //     res.locals.pageTitle = "Visit schedules";
    //     res.render('mobile/sessions.ejs', {
    //         layout: activeLayout
    //     });
    // });

    // app.get('/m/session', function(req, res) {
    //     res.locals.pageTitle = "Session";
    //     res.render('mobile/session.ejs', {
    //         layout: activeLayout
    //     });
    // });

    // // show csclocations screen
    // app.get('/m/factsheet', function(req, res) {
    //     res.locals.pageTitle = "Our fact sheet";
    //     res.render('mobile/factsheet.ejs', {
    //         layout: activeLayout
    //     });
    // });

    // app.get('/m/sessiondetail', auth.isLoggedIn, function(req, res) {
    //     res.locals.pageTitle = "Session Details";
    //     res.render('mobile/sessiondetail.ejs', {
    //         layout: 'layouts/scheduleDetail'
    //     });
    // });
}
