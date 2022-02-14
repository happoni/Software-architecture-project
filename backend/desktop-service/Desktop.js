const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const desktopSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		unique: true,
		minlength: 2,
	},
	location: {
		type: String,
		require: true,
		minlength: 2,
	},
})

desktopSchema.plugin(uniqueValidator)
module.exports = mongoose.model("desktop", desktopSchema)