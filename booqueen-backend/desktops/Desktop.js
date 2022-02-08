// Using REST
const mongoose = require('mongoose');
const DekstopSchema = mongoose.Schema({
	name: {
		type: String,
		require: true
	},
	location: {
		type: String,
		require: true
	},
})

const Desktop = mongoose.model("Desktop", DesktopSchema);

module.exports = Desktop;