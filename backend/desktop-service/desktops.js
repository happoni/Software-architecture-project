// Desktop service, using REST.

// dotenv has some issues with .env path...
// Switch commenting in next two lines if you don't use npm run server -script
//require("dotenv").config({ path: "../../.env" });
require("dotenv").config({ path: "../.env" });
const express = require('express')
const app = express()
require('../db/db')
const Desktop = require('./Desktop')

app.use(express.json())

app.post('/desktop', (req, res) => {
	const newDesktop = new Desktop({...req.body})
	newDesktop.save()
	.then((newDesktop) => {
		res.json(newDesktop)
	})
	.catch((error) => {
		res.status(500).send("Internal server error!")
	})
})

app.get('/desktops', (req, res) => {
	Desktop.find().then((desktops) => {
		if (desktops) {
			res.json(desktops)
		} else {
			res.status(404).send('Desktops not found')
		}
	}).catch((error) => {
		res.status(500).send('Internal server error')
	})
})

app.get('/desktop/:id', (req, res) => {
	Desktop.findById(req.params.id).then((desktop) => {
		if (desktop) {
			res.json(desktop)
		} else {
			res.status(404).send('Desktop not found')
		}
	}).catch((error) => {
		res.status(500).send('Internal server error')
	})
})

const PORT = process.env.DESKTOP_PORT || 5002
app.listen(PORT, () => {
	console.log(`Server up and running on port ${PORT}. This is the desktop service.`)
})
