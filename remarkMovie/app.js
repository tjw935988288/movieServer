const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 3000;
const dbUrl = 'mongodb://localhost/movies';
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);
app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
	secret: 'maimi',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}))
require('./config/router')(app);
app.locals.moment = require('moment');
app.listen(port);

console.log('server has listen port' + port);