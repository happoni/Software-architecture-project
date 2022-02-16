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
`

const resolvers = {
	Desktop: {
		__resolveReference(ref) {
			return fetch(`${apiUrl}/users/${ref.id}`).then(res => res.json())
		}
	},
	Query: {
		user(_, { id }) {
			return fetch(`${apiUrl}/users/${id}`).then(res => res.json())
		},
		users() {
			return fetch(`${apiUrl}/users`).then(res => res.json())
		}
	}
}

const server = new ApolloServer({
	schema: buildSubgraphSchema([{ typeDefs, resolvers }])
})

server.listen(port).then(({ url }) => {
	console.log(`Users service ready at ${url}`)
})