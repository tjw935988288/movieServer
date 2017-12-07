const Movie = require('../models/movie');

module.exports.index = (req, res) => {
	Movie.fetch((err, movies) => {
		if(err) {
			console.log(err);
		} else {
			res.render('index', {
				title: '首页',
				movies
			})
		}
	})
}