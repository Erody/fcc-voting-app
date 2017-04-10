const express = require('express');
const router = express.Router();
const mockPolls = require('../mockPolls');

router.get('/', (req, res) => {
	res.send('api');
});

router.get('/polls', (req, res) => {
	res.json({mockPolls});
});

module.exports = router;