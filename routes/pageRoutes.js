var constants					= require('../scripts/constants');
var logger 						= require(constants.paths.scripts + '/logger');
var util 							= require(constants.paths.scripts + '/util');
var assetBuilder 			= require(constants.paths.scripts + '/assetBuilder');
var auth 							= require('./auth.js');

module.exports = function(app)
{

    // route to keynotes
    app.get('/keynotes', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "Keynotes";
        res.render('misc/keynotes.ejs', {});
    });

    // route to clients
    app.get('/clients', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "Clients";
        res.render('misc/clients.ejs', {});
    });


    // route to scheduler
    app.get('/scheduler', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "Scheduler";
        res.render('misc/scheduler.ejs', {});
    });
    // route to facts
    app.get('/facts', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "facts";
        res.render('misc/facts.ejs', {});

    });

    // route to profile
    app.get('/profile', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "profile";
        res.render('profile.ejs', {});
    });





    // route to feedback
    app.get('/feedback', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "feedback";
        res.render('misc/feedback.ejs', {});
    });
    // route to visits
    app.get('/visits', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "visits";
        res.render('misc/visits.ejs', {});
    });

    // route to admin module
    app.get('/admin/', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "Site Administration";
			  res.locals.appName = "ng-app='cviz-admin'"
				res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,admin");
				res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,admin");
        res.render('admin/home.ejs', {});
    });

		// route to supporting modules
		app.get('/customize/', auth.isLoggedIn, function(req, res) {
				res.locals.pageTitle = "Customize";
				res.locals.appName = "ng-app='cviz-customize'"
				res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,customize");
				res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,customize");
				res.render('admin/home.ejs', {});
		});

		// route to main module
		app.get('/m/main/', auth.isLoggedIn, function(req, res) {
				res.locals.pageTitle = "Mobile Home";
				res.locals.appName = "ng-app='mviz-main'"
				res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,m-home");
				res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,m-home");
				res.render('mobile/home.ejs', {});
		});

		// route to facts module
		app.get('/m/facts/', auth.isLoggedIn, function(req, res) {
				res.locals.pageTitle = "Factsheets";
				res.locals.appName = "ng-app='mviz-facts'"
				res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,m-facts");
				res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,m-facts");
				res.render('mobile/home.ejs', {});
		});

		// route to visits module
		app.get('/m/visits/', auth.isLoggedIn, function(req, res) {
				res.locals.pageTitle = "Visit Agenda";
				res.locals.appName = "ng-app='mviz-visits'"
				res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,m-visits");
				res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,m-visits");
				res.render('mobile/home.ejs', {});
		});

}
