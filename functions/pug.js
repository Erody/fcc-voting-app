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

exports.voteOptions = function(req, chart, extraOptions) {
	const optionObj = {
		options: chart.options,
		title: chart.name,
		id: req.params.id,
		authenticated: req.isAuthenticated()
	};

	if(extraOptions) {
		return Object.assign(optionObj, extraOptions);
	} else {
		return optionObj;
	}
};

exports.profileOptions = function(req, charts, user) {
	const optionObj = {
		user: req.user,
		userName: user.name,
		authenticated: req.isAuthenticated(),
		charts
	};

	if(req.user) {
		const reqUserId = JSON.stringify(req.user._id);
		const userId = JSON.stringify(user._id);
		return Object.assign(optionObj, {isThisOwner: reqUserId === userId});
	} else {
		return Object.assign(optionObj, {isThisOwner: false});
	}
};



// if needed make it possible to pass key-value pairs to add to the returned object.