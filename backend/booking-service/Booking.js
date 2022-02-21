const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	desktopId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Desktop',
		required: true,
	}
})

bookingSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Booking", bookingSchema)