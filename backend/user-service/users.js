// Using REST at the moment. We shall see whether we keep it like this or switch to GraphQL.

require("dotenv").config({ path: "../../.env" });
const express = require('express');
// const cors = require('cors')
const app = express();
require('../db/db');
const User = require('./User');

app.use(express.json())

// Create a new user
app.post('/user', (req, res) => {
	const newUser = new User({...req.body});
	newUser.save().then(() => {
		res.send('New user created!');
	}).catch((error) => {
		res.status(500).send('Internal Server Error!');
	})
})

// Return all users
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

// Return specific user by id
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

// Remove specific user by id
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

// Run the service
const PORT = process.env.USER_PORT || 5001
app.listen(PORT, () => {
	console.log(`Server up and running on port ${PORT}- This is the user service`);
})
