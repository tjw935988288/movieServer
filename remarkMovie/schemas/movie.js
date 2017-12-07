const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var movieSchema = new Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		},
	}
});

movieSchema.pre('save', function(next) {
	if (!this.isNew) {
		this.meta.update = Data.now();
	}
	
	next();
})

movieSchema.statics = {
	fetch(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}

module.exports = movieSchema;
