var auth = require('./auth.js');

module.exports = function(app, passport) 
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

      app.get('/style', function(req, res) {
        res.locals.pageTitle = "style";
        res.render('styles.ejs', {});
    });
        app.get('/dialog', function(req, res) {
        res.locals.pageTitle = "dialog";
        res.render('dialog.ejs', {});
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

    // route to admin/users
    app.get('/admin/users', auth.isLoggedIn, function(req, res) {
        res.locals.pageTitle = "users";
        res.render('misc/admin/users.ejs', {});
    });

}