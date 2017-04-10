exports.handle500 = function(error, req, res, next) {
	console.log(error);
	res.status(500);
	res.render('500', {title: '500: Internal Server Error', error });
};

exports.handle404 = function(req, res) {
	res.status(404);
	res.render('404', {title: '404: Page not Found'});
};