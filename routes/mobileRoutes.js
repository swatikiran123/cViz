var auth = require('./auth.js');

module.exports = function(app, passport) {

    // show welcome screen
    app.get('/m/', function(req, res) {
        res.locals.pageTitle = "Welcome...";
        res.render('mobile/welcome.ejs', {
            layout: 'layouts/mobile'
        });
    });
    
    app.get('/m/sessions', function(req, res) {
        res.locals.pageTitle = "Visit schedules";
        res.render('mobile/sessions.ejs', {
            layout: 'layouts/mobile'
        });
    });

    app.get('/m/session', function(req, res) {
        res.locals.pageTitle = "Session";
        res.render('mobile/session.ejs', {
            layout: 'layouts/mobile'
        });
    });

    // show csclocations screen
    app.get('/m/factsheet', function(req, res) {
        res.locals.pageTitle = "Our fact sheet";
        res.render('mobile/factsheet.ejs', {
            layout: 'layouts/mobile'
        });
    });

}