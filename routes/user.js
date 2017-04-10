const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/various').isAuthenticated;
const User = require('../models/User');
const Chart = require('../models/Chart');
const profileOptions = require('../functions/pug').profileOptions;
// function isThisUser to give access to options etc

router.get('/', (req, res) => {
	res.render('index', {message: 'Hello World!', authenticated: req.isAuthenticated()});
});

router.get('/:id', (req, res) => {
	User
		.findOne({_id: req.params.id}, {oauthID: 0})
		.exec((err, user) => {
			Chart
				.find({_creator: req.params.id})
				.exec((err, charts) => {
					console.log(req.user);
					res.render('profile', profileOptions(req, charts, user));
				});
		});

});

module.exports = router;