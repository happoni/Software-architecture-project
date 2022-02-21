// dotenv has some issues with .env path...
// Switch commenting in next two lines if you don't use npm run server -script
//require("dotenv").config({ path: "../../.env" })

require("dotenv").config({ path: "../.env" })
const express = require('express')
const app = express()
require('../db/db')
const Booking = require('./Booking')

app.use(express.json())

app.post('/booking', (req, res) => {
	const newBooking = new Booking({...req.body})
	newBooking.save()
	.then((newBooking) => {
		res.json(newBooking)
	})
	.catch((error) => {
		res.status(500).send("Internal server error!")
	})
})

app.get('/bookings', (req, res) => {
	Booking.find().then((bookings) => {
		if (bookings) {
			res.json(bookings)
		} else {
			res.status(404).send('Bookings not found')
		}
	}).catch((error) => {
		res.status(500).send('Internal server error')
	})
})

app.get('/bookings/:id', (req, res) => {
	Booking.findById(req.params.id).then((booking) => {
		if (booking) {
			res.json(booking)
		} else {
			res.status(404).send('Booking not found')
		}
	}).catch((error) => {
		res.status(500).send('Internal server error')
	})
})

const PORT = process.env.BOOKING_PORT || 5003
app.listen(PORT, () => {
	console.log(`Server up and running on port ${PORT}. This is the booking service.`)
})
