const { ApolloServer, gql } = require("apollo-server")
const { buildSubgraphSchema } = require("@apollo/subgraph")
const fetch = require("node-fetch")

const port = 4002
const apiUrl = "http://localhost:5002"

const typeDefs = gql`
	type Desktop @key(fields: "id") {
		id: ID!
		name: String
		location: String
	}

	extend type Query {
		desktop(id: ID!): Desktop
		desktops: [Desktop]
		desktopsByLocation(location: String!): [Desktop]
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
		desktopsByLocation(_, { location }) {
			return fetch(`${apiUrl}/desktops`)
			.then(res => res.json())
			.then(json => json.filter(d => {
				return d.location === location
			}))
		}
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
