const { ApolloServer, gql } = require("apollo-server")
const { buildSubgraphSchema } = require("@apollo/subgraph")

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
	}
`

const resolvers = {
// Hmm... How to implement these?
}

const server = new ApolloServer({
	schema: buildSubgraphSchema([{ typeDefs, resolvers }])
})

server.listen(port).then(({ url }) => {
	console.log(`Users service ready at ${url}`)
})
