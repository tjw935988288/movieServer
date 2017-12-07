const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
	name: {
		unique: true,
		type: String
	},
	password: {
		unique: true,
		type: String
	},
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

UserSchema.pre('save', function(next) {
	let user = this;
	
	if (!this.isNew) {
		this.meta.update = Data.now();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {		
		if (err) return next(err)
		
		//asyn
		bcrypt.hash(user.password, salt, (err, hash) => {
			if (err) return next(err)
			
			user.password = hash;
			next();
		})
	})
})

UserSchema.methods = {
	comparePassword(password, cb) {
		bcrypt.compare(password, this.password, (err, isMatch) => {
			if (err) return cb(err);
			
			return cb(null, isMatch);
		})
	}
}

UserSchema.statics = {
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

module.exports = UserSchema;
