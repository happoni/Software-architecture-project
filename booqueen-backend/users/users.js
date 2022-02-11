require("dotenv").config({ path: "../../.env" });
const express = require('express');

require('../db/db');

const User = require('./User');

const app = express();
const port = 5000;
app.use(express.json())

app.post('/user', (req, res) => {
	const newUser = new User({...req.body});
	newUser.save().then(() => {
		res.send('New user created!');
	}).catch((error) => {
		res.status(500).send('Internal Server Error!');
	})
})

app.get('/users', (req, res) => {
	User.find().then((users) => {
		 if (users) {
				res.json(users)
		 } else {
				res.status(404).send('Users not found');
		 }
	}).catch((error) => {
			 res.status(500).send('Internal Server Error!');
 });
})

app.get('/user/:id', (req, res) => {
	User.findById(req.params.id).then((user) => 	{
	 if (user) {
				res.json(user)
		} else {
				res.status(404).send('User not found');
		}
	}).catch((error) => {
				res.status(500).send('Internal Server Error!');
 });
})

app.delete('/user/:id', (req, res) => {
User.findByIdAndRemove(req.params.id).then((user) => {
	if (user) {
			 res.json('User deleted!')
		} else {
			 res.status(404).send('User not found');
		}
	}).catch((error) => {
		 res.status(500).send('Internal Server Error!');
});
});

app.listen(port, () => {
	console.log(`Up and Running on port ${port}- This is User service`);
})