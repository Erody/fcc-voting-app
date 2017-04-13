require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const User = require('./models/User');
const handle500 = require('./functions/error').handle500;
const handle404 = require('./functions/error').handle404;
const generalRoutes = require('./routes/general');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const pollsRoutes = require('./routes/polls');
const userRoutes = require('./routes/user');


const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.DB_MLAB);
mongoose.Promise = global.Promise;

app.set('view engine', 'pug');
app.set('views', __dirname + '/public/views');
app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user._id);
});
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		err ? done(err, null) : done(null, user);
	});
});

app.use('/', generalRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/polls', pollsRoutes);
app.use('/user', userRoutes);
app.use(handle404);
app.use(handle500);

app.listen(port, () => {console.log(`Listening on port ${port}...`)});

// todo write script for rendering result page
// todo make everything pretty with css