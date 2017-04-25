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
			if(!chart) {
				res.json({error: 'No polls exist at this time.'})
			} else {
				res.redirect(chart.urlId);
			}
		});
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
			isOwner(req, (value) => {
				if(value) {
					res.render('chart', chartOptions(req, chart, {isOwner: true}));
				} else {
					res.render('chart', chartOptions(req, chart));
				}
			})

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
	Chart
		.findOne({urlId: req.params.id}, {name: 1})
		.exec((err, chart) => {
			if(err) console.log(err);
			res.render('polls/newOption', {authenticated: req.isAuthenticated(), title: chart.name, urlId: req.params.id})
		});
});

router.get('/:id/results', isAuthenticated, (req, res) => {
	isOwner(req, (value) => {
		if(value) {
			Chart
				.findOne({urlId: req.params.id}, {options: 1, name: 1})
				.populate('_creator', 'name')
				.exec((err, chart) => {
					if(err) console.log(err);
					res.render('result', {authenticated: req.isAuthenticated(), title: chart.name, chart});
				});

		} else {
			res.redirect('/');
		}
	})
});

router.get('/:id/delete', isAuthenticated, (req, res) => {
	isOwner(req, (value) => {
		if(value){
			Chart
				.findOneAndRemove({ urlId: req.params.id }, (err, chart) => {
					if(err) console.log(err);
					res.redirect(`/user/${chart._creator}`);
				});
		} else {
			res.redirect('/');
		}
	});
});

router.post('/:id/vote', isAuthenticated, (req, res) => {
	Chart
		.findOne({urlId: req.params.id}, (err, chart) => {
			for(let i = 0; i<chart.votes.length; i++ ) {
				const voteId = JSON.stringify(chart.votes[i]._id);
				const userId = JSON.stringify(req.user._id);
				if(voteId === userId) {
					// flash message user already voted
					res.redirect('/');
					break;
				}
				if(i === chart.votes.length && voteId !== userId) {
					castVote(chart, req, res);
				}
			}
			if(!chart.votes.length){
				castVote(chart, req, res);
			}
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
	res.redirect(`/polls/${req.params.id}`)
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
		created: Date.now(),
		votes: []
	}, (err, chart) => {
		if(err) console.log(err);
	});
	res.redirect(`${urlId}/vote`);
});

function castVote(chart, req, res) {
	chart.options.forEach(option => {
		if(option[req.body.vote] !== undefined) {
			option[req.body.vote][1]++;
			chart.votes.push({
				_id: req.user._id,
				votedFor: Object.keys(option)[0],
				timeStamp: Date.now()
			});
			chart.markModified('options');
			chart.markModified('votes');
			chart.save(err => {
				if(err) console.log(err);
				res.redirect(`/polls/${req.params.id}`);
			});
		}
	});
}


module.exports = router;