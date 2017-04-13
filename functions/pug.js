exports.chartOptions = function(req, chart, extraOptions) {
	const optionObj = {
		title: chart.name,
		options: chart.options,
		authenticated: req.isAuthenticated(),
		user: req.user,
		urlId: chart.urlId
	};

	if(extraOptions) {
		return Object.assign(optionObj, extraOptions);
	} else {
		return optionObj;
	}

};

exports.voteOptions = function(req, chart) {
	return {
		options: chart.options,
		title: chart.name,
		id: req.params.id,
		authenticated: req.isAuthenticated()
	}
};

exports.profileOptions = function(req, charts, user) {
	return {
		user: req.user,
		userName: user.name,
		authenticated: req.isAuthenticated(),
		charts
	}
};



// if needed make it possible to pass key-value pairs to add to the returned object.