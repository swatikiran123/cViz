var auth = {

	isLoggedIn: function (req, res, next) {

    if (req.isAuthenticated())
        return next();

    // A simple detour for token access
    // Application can access token after login to connect with API
    if(req.url.indexOf('/token') > -1)
        res.status(404).send("Not Found");
    else
        res.redirect('/login?' + req.path);
	}
};

module.exports = auth;