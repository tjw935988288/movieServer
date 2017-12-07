const Movie = require('../models/movie');
const Comment = require('../models/comment');

module.exports.detail = (req, res) => {
	const _id = req.params.id;
		
	Movie.findById(_id, (err, movie) => {
		Comment
      		.find({movie: _id})
      		.populate('from', 'name')
      		.populate('reply.from reply.to', 'name')
      		.exec(function(err, comments) {
        		res.render('detail', {
          			title: movie.title,
					movie,
          			comments
        		})
      		})			
	})
}
	
module.exports.new = (req, res) => {
	res.render('admin', {
		title: 'imooc后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''
		}
	})
}
	
module.exports.update = (req, res) => {
	const _id = req.params.id;
		
	Movie.findById(_id, (err, movie) => {
		if (err) {
			console.log(err);
		}
			
		res.render('admin', {
			title: 'imooc后台录入页',
			movie
		})
	})
}
	
module.exports.save = (req, res) => {
	const _id = req.body.movie._id;
	const _movie = req.body.movie;
		
	if (_id === 'undefined') {
		const movie = new Movie({
			doctor: _movie.doctor,
			title: _movie.title,
			language: _movie.language,
			country: _movie.country,
			summary: _movie.summary,
			year: _movie.year
		});
		movie.save((err, movie) => {
			if (err) {
				console.log(err);
			}
			else {
				res.redirect('/movie/' + movie._id);
			}
		})
	}
	else {
		Movie.findById(_id, (err, movie) => {
			if (err) {
				console.log(err);
			}
			else {
				movie = _.extend(movie, _movie);
			
				movie.save((err, movie) => {
					res.redirect('/movie/' + movie._id);
				})	
			}
		})
	}
}
	
module.exports.list = (req, res) => {
		Movie.fetch((err, movies) => {
			if (err) {
				console.log(err);
			}
			else {
				res.render('list', {
				title: '电影列表页',
				movies
			})		
		}
	})
}

module.exports.del = (req, res) => {
	const _id = req.query.id;
		
	if (_id) {
		Movie.remove({_id: _id}, (err, movie) => {
			if (err) {
				console.log(err);
			}
			else {
				res.json({success: 1});
			}
		})
	}
}
