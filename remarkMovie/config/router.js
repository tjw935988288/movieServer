const Index = require('../controllers/index');
const Movie = require('../controllers/movie');
const User = require('../controllers/user');
const Comment = require('../controllers/comment');
const _ = require('underscore');

function routers(app){
	app.use((req, res, next) => {
		const _user = req.session.user;
		
		if (_user) {
			app.locals.user = _user;
		}
		
		return next();
	})
	
	app.get('/index', Index.index);
	
	app.get('/movie/:id', Movie.detail);
	app.get('/admin/movie', User.signinRequired, Movie.new);
	app.get('/admin/movie/update/:id', User.signinRequired, Movie.update);
	app.post('/admin/movie/new', User.signinRequired, Movie.save);
	app.get('/admin/list', User.signinRequired, Movie.list);
	app.delete('/admin/list', User.signinRequired, Movie.del);
	
	app.post('/user/signup', User.signup);
	app.get('/admin/user/list', User.signinRequired, User.list);
	app.post('/user/signin', User.signin);
	app.get('/user/logout', User.logout);
	app.get('/signup', User.showsignup);
	app.get('/signin', User.showsignin);
	
	app.post('/user/comment', User.signinRequired, Comment.save)
}

module.exports = routers;