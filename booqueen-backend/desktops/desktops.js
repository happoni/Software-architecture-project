require("dotenv").config();
const express = require('express');

require('../db/db');

const Desktop = require('./Desktop');

const app = express();
const port = 3000; // Different port than other services.
app.use(express.json())

app.post('/desktop', (req, res) => {
	const newDesktop = new Desktop({...req.body});
	newDesktop.save().then(() => {
		res.send('New desktop created!');
	}).catch((error) => {
		res.status(500).send('Internal Server Error!');
	})
})

app.get('/desktops', (req, res) => {
	Desktop.find().then((desktops) => {
		 if (desktops) {
				res.json(desktops)
		 } else {
				res.status(404).send('Desktops not found');
		 }
	}).catch((error) => {
			 res.status(500).send('Internal Server Error!');
 });
})

app.get('/desktop/:id', (req, res) => {
	Desktop.findById(req.params.id).then((desktop) => 	{
	 if (desktop) {
				res.json(desktop)
		} else {
				res.status(404).send('Desktop not found');
		}
	}).catch((error) => {
				res.status(500).send('Internal Server Error!');
 });
})

app.delete('/desktop/:id', (req, res) => {
Desktop.findByIdAndRemove(req.params.id).then((desktop) => {
	if (desktop) {
			 res.json('Desktop deleted!')
		} else {
			 res.status(404).send('Desktop not found');
		}
	}).catch((error) => {
		 res.status(500).send('Internal Server Error!');
});
});

app.listen(port, () => {
	console.log(`Up and Running on port ${port}- This is Desktop service`);
})