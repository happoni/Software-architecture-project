const { Apolloserver, UserInputError, AuthenticationError, gql} = require('apollo-server')
const { v1: uuid } = require('uuid')
// const jwt = require('jsonwebtoken')

//const mongoose = require('mongoose')
const Desktop = require('./Desktop')
require('../db/db');

// const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


const typeDefs = gql`
	type Desktop {
		name: String!
		location: String!
		id: ID!
	}
	
	type Query {
		desktopCount: Int!
		allDesktops: [Desktop!]!
		findDesktop(name: String!): Desktop
	}
	
	type Mutation {
		addDesktop(
			name: String!
			location: String!
		): Desktop
	}
`

const resolvers = {
	Query: {
		desktopCount: () => Desktop.collection.countDocuments(),
		allDesktops: (root, args) => {
			if (!args.location) {
				return Desktop.find({})
			}

			return Desktop.find({ })
		}
	}
}


/*
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

*/