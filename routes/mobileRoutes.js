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

    app.get('/m/visit/add', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "Visit Add";
        res.locals.appName = "ng-app='mviz-add'"
        res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "m-general,m-angular,m-visitAdd");
        res.locals.appAssets = assetBuilder.getAssets("appAssets", "m-general,m-angular,m-visitAdd");
        res.render('mobile/visitAdd.ejs', {
            layout: activeLayout
        });
    });
}
