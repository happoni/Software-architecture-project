const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		minlength: 2,
	},
	email: {
		type: String,
		minlength: 6,
	}
})

const User = mongoose.model("user", userSchema)

module.exports = User