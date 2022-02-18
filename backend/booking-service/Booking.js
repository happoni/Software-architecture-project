const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema({
	startDate: {
		type: String,
		required: true,
	},
	endDate: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
	},
	desktopId: {
		type: String,
	}
})

bookingSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Booking = mongoose.model("booking", bookingSchema)

module.exports = Booking