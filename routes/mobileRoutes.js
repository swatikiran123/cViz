var auth = require('./auth.js');

module.exports = function(app, passport) {

    // show welcome screen
    app.get('/m/welcome', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "Welcome to CSC";
        res.render('mobile/welcome.ejs', {
            layout: 'layouts/mobile'
        });
    });
    app.get('/m/session', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "Visit schedules";
        res.render('mobile/session.ejs', {
            layout: 'layouts/schedule'
        });
    });


    // show csclocations screen
    app.get('/m/csclocations', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "Go your own way";
        res.render('mobile/csclocation.ejs', {
            layout: 'layouts/mobile'
        });
    });

}