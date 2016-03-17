module.exports = function(app)
{

	app.get('/style', function(req, res) {
		res.locals.pageTitle = "style";
		res.render('styles.ejs', {});
	});

	app.get('/dialog', function(req, res) {
		res.locals.pageTitle = "dialog";
		res.render('dialog.ejs', {});
	});

}
