// This is a part of the gateway. This service is responsible for handling users via
// microservice User service.

const { ApolloServer, gql } = require("apollo-server")
const { buildSubgraphSchema } = require("@apollo/subgraph")
const fetch = require("node-fetch")

const port = 4001
const apiUrl = "http://localhost:5001"

const typeDefs = gql`
	type User @key(fields: "id") {
		id: ID!
		username: String
		email: String
	}

	extend type Query {
		user(id: ID!): User
		users: [User]
	}

	type Mutation {
		addUser(
			username: String!
			email: String!	
		): User
	}
`
// Gotta add feature to remove users.


const resolvers = {
	User: {
		__resolveReference(ref) {
			return fetch(`${apiUrl}/user/${ref.id}`).then(res => res.json())
		}
	},
	Query: {
		user(_, { id }) {
			return fetch(`${apiUrl}/user/${id}`).then(res => res.json())
		},
		users() {
			return fetch(`${apiUrl}/users`).then(res => res.json())
		}
	},
	Mutation: {
		addUser(_, { username, email }) {
			const user = {
				username: username,
				email: email
			}
			
			return fetch(`${apiUrl}/user`, {
				method: 'POST',
				body: JSON.stringify(user),
				headers: { 'Content-Type': 'application/json' }
			}).then(res => res.json())
		}
	}
}

const server = new ApolloServer({
	schema: buildSubgraphSchema([{ typeDefs, resolvers }])
})

server.listen(port).then(({ url }) => {
	console.log(`Users service ready at ${url}`)
})