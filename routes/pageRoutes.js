var constants				= require('../scripts/constants');
var logger 					= require(constants.paths.scripts + '/logger');
var util 					= require(constants.paths.scripts + '/util');
var assetBuilder 			= require(constants.paths.scripts + '/assetBuilder');
var auth 					= require('./auth.js');

module.exports = function(app)
{

    // route to admin module
    app.get('/admin/', auth.isLoggedIn, function(req, res) {
		res.locals.pageTitle = "Site Administration";
		res.locals.appName = "ng-app='cviz-admin'"
		res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,admin");
		res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,admin");
        res.render('admin/home.ejs', {});
    });

	app.get('/profile/', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "User Profile";
		res.locals.appName = "ng-app='cviz-profile'"
		res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,profile");
		res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,profile");
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

	// route to visits modules
	app.get('/manage/', auth.isLoggedIn, function(req, res) {
			res.locals.pageTitle = "Visits";
			res.locals.appName = "ng-app='cviz-manage'"
			res.locals.stdAssets = assetBuilder.getAssets("stdAssets", "general,angular,visits");
			res.locals.appAssets = assetBuilder.getAssets("appAssets", "general,angular,visits");
			res.render('admin/home.ejs', {});
	});
}
