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


/*
const { ApolloServer, gql } = require("apollo-server")
const { buildSubgraphSchema } = require("@apollo/subgraph")

const port = 4002

const typeDefs = gql`
	type Desktop @key(fields: "id") {
		id: ID!
		name: String
		location: String
	}

	extend type Query {
		desktop(id: ID!): Desktop
		desktops: [Desktop]
	}

	type Mutation {
		addDesktop(
			name: String!
			location: String!
		): Desktop
	}
`

const resolvers = {

	Desktop: {
		__resolveReference(ref) {
			return fetch(`${apiUrl}/desktops/${ref.id}`).then(res => res.json()) 
		}
	},

	Query: {
		desktop(_, { id }) {
			return fetch(`${apiUrl}/desktops/${id}`).then(res => res.json())
		},
		desktops() {
			return fetch(`${apiUrl}/desktops`).then(res => res.json())
		},
	},

	Mutation: {
		addDesktop(_, { name, location }) {
			const desktop = {
				name: name,
				location: location
			}

			return fetch(`${apiUrl}/desktop`, {
				method: 'POST',
				body: JSON.stringify(desktop),
				headers: { 'Content-Type': 'application/json'}
			}).then(res => res.json())
		}
	}
}

const server = new ApolloServer({
	schema: buildSubgraphSchema([{ typeDefs, resolvers }])
})

server.listen(port).then(({ url }) => {
	console.log(`Desktop service ready at ${url}`)
})
*/