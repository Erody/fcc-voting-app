const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/various').isAuthenticated;
const isOwner = require('../functions/various').isOwner;
const randomNumberString = require('../functions/various').randomNumberString;
const Chart = require('../models/Chart');
const User = require('../models/User');
const chartOptions = require('../functions/pug').chartOptions;
const voteOptions = require('../functions/pug').voteOptions;
const createOptionsArray = require('../functions/various').createOptionsArray;

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

router.get('/:id/option', isAuthenticated, (req, res) => {
	res.render('polls/newOption', {authenticated: req.isAuthenticated(), title: 'Placeholder', urlId: req.params.id})
});

router.get('/:id/delete', isAuthenticated, (req, res) => {
	isOwner(req, (value) => {
		if(value){
			console.log('Correct user, start deletion.')
		} else {
			console.log('User is not owner, redirect to homepage');
		}
	});
	// todo finish this function
	res.redirect('/');
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

router.post('/:id/option', isAuthenticated, (req, res) => {
	const options = createOptionsArray(req.body);
	Chart
		.findOneAndUpdate(
			{ urlId: req.params.id },
			{ $pushAll: { options: options}},
			{ safe: true, upsert: true },
			(err, model) => {
				if(err) console.log(err)
			}
		);
	res.redirect('/')
});

router.post('/new', isAuthenticated, (req, res) => {
	const { title } = req.body;
	const options = createOptionsArray(req.body);
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