const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/various').isAuthenticated;
const randomNumberString = require('../functions/various').randomNumberString;
const Chart = require('../models/Chart');
const User = require('../models/User');
const chartOptions = require('../functions/pug').chartOptions;
const voteOptions = require('../functions/pug').voteOptions;

router.get('/', (req, res) => {
	res.redirect('/latest');
});

router.get('/latest', (req, res) => {
	Chart.findOne()
		.sort('-created')
		.exec((err, chart) => {
			if(err) console.log(err);
			res.render('chart', chartOptions(req, chart));
		});
	// render latest polls
});

router.get('/new', isAuthenticated, (req, res) => {
	res.render('polls/new', {authenticated: req.isAuthenticated()});
});

router.get('/:id', (req, res) => {
	Chart
		.findOne({urlId: req.params.id})
		.populate('_creator', 'name') // only populate name, might add profile link and/or social media links as well
		.exec((err, chart) => {
			if(err) console.log(err);
			res.render('chart', chartOptions(req, chart));
		});

});

router.get('/:id/vote', isAuthenticated, (req, res) => {
	Chart
		.findOne({urlId: req.params.id}, {options: 1, name: 1})
		.populate('_creator', 'name') // only populate name, might add profile link and/or social media links as well
		.exec((err, chart) => {
			if(err) console.log(err);
			res.render('vote', voteOptions(req, chart));
		});
});

router.post('/:id/vote', isAuthenticated, (req, res) => {
	const vote = req.body.vote;
	Chart
		.findOne({urlId: req.params.id}, (err, chart) => {
			chart.options.forEach(option => {
				if(option[vote] !== undefined) {
					option[vote][1]++;
					chart.markModified('options');
					chart.save(err => {
						if(err) console.log(err);
						res.redirect(`/polls/${req.params.id}`);
					});
				}
			});
		});
});

router.post('/new', isAuthenticated, (req, res) => {
	const { title } = req.body;
	const options = [];
	for(const prop in req.body) {
		if(req.body.hasOwnProperty(prop)) {
			if(prop !== 'title') {
				const optionName = req.body[prop]
				const cleanKey = optionName.replace(/[^a-zA-Z0-9]/g, '');
				options.push({[cleanKey]: [optionName, 0]})
			}
		}
	}
	const urlId = randomNumberString(12);
	Chart.create({
		name: title,
		options,
		urlId,
		_creator: req.user.id,
		created: Date.now()
	}, (err, chart) => {
		if(err) console.log(err);
	});
	res.redirect(`${urlId}/vote`);
});

module.exports = router;