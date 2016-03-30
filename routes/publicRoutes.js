module.exports = function(app)
{

	app.get('/public/styles', function(req, res) {
		res.locals.pageTitle = "style";
		res.render('styles.ejs', {});
	});

	app.get('public/styles/dialog', function(req, res) {
		res.locals.pageTitle = "dialog";
		res.render('dialog.ejs', {});
	});

}
