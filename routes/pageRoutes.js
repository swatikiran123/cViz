var auth = require('./auth.js');

module.exports = function(app, passport) {

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


}