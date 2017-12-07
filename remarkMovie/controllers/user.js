const User = require('../models/user');

module.exports.list = (req, res) => {
	User.find({}, (err, users) => {
		if (err) {
			console.log(err);
		}
		else {
			res.render('userlist', {
				title: '用户列表页',
				users
			})
		}
	})
}
	
module.exports.signin = (req, res) => {
	const _user = req.body.user;
	const _name = _user.name;
	const _password = _user.password;
		
	User.findOne({name: _user.name}, (err, user) =>{
		if (err) {
			console.log(err);
		}
			
		if (!user) {
			return res.redirect('/');
		}
			
		user.comparePassword(_password, (err, isMatch) => {
			if (err) {
				console.log(err);
			}
			
			if (isMatch) {
				req.session.user = user;
				
				return res.redirect('/index')
			}
			else {
				console.log('password is not matched');
			}
		})
	})
}

module.exports.signup = (req, res) => {
	const _user = req.body.user;
		
	User.find({name: _user.name}, (err, user) => {
		if (err) {
			console.log(err);
		}
			
		if (user.length) {
			res.redirect('/index');			
		}
		else {
			const user = new User(_user);
			user.save((err, user) => {
				if (err) {
					console.log(err);
				}
		
				else {
					res.redirect('/admin/user/list');
				}
			})											
		}
	})
}
	
module.exports.logout = (req, res) => {
	delete req.session.user;
		
	res.redirect('/index');
}

module.exports.showsignup = (req, res) => {
	res.render('signup', {
		title: '用户注册页面'
	})
}

module.exports.showsignin = (req, res) => {
	res.render('signin', {
		title: '用户登陆页面'
	})
}

module.exports.showsignup = (req, res) => {
	res.render('signup', {
		title: '用户注册页面'
	})
}

module.exports.signinRequired = (req, res, next) => {
	const _user = req.session.user;
	
	if (!_user) {
		return res.redirect('/signin');
	}
	
	next();
}
