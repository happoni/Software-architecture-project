const mongoose = require('mongoose');

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

const Desktop = mongoose.model("desktop", desktopSchema);

module.exports = Desktop;