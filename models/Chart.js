const mongoose = require('mongoose');

const Chart = mongoose.model('Chart', {
	name: String,
	urlId: String,
	_creator: { type: String, ref: 'User'},
	options: [{}],
	created: Date,
	votes: [{type: mongoose.Schema.Types.Object, ref: 'User'}]
});

module.exports = Chart;