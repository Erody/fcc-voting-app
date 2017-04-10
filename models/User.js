const mongoose = require('mongoose');

const User = mongoose.model('User', {
	oauthID: Number,
	name: String,
	created: Date,
	charts: [{type: mongoose.Schema.Types.ObjectId, ref:'Chart'}]
});

module.exports = User;