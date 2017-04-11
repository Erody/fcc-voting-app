const Chart = require('../models/Chart');


exports.randomNumberString = function(length) {
	const result = [];
	for(let i = 0; i < length; i++) {
		const random = getRandomArbitrary(0, 9);
		result.push(Math.round(random));
	}
	return result.join('');
};

exports.createOptionsArray = function(body){
	const options = [];
	for(const prop in body) {
		if(body.hasOwnProperty(prop)) {
			if(prop !== 'title') {
				const optionName = body[prop];
				const cleanKey = optionName.replace(/[^a-zA-Z0-9]/g, '');
				options.push({[cleanKey]: [optionName, 0]})
			}
		}
	}
	return options;
};

exports.isOwner = function(req, cb) {
	Chart
		.findOne({ urlId: req.params.id })
		.populate('_creator', '_id')
		.exec((err, chart) => {
			if(JSON.stringify(req.user._id) === JSON.stringify(chart._creator._id) ) {
				cb(true);
			} else {
				cb(false);
			}
		});
};

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

