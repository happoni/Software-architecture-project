const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const desktopSchema = mongoose.Schema({
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

desktopSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

desktopSchema.plugin(uniqueValidator)
module.exports = mongoose.model("desktop", desktopSchema)