require("dotenv").config({ path: "../../.env" });
const { ApolloServer, gql, UserInputError} = require('apollo-server')
const Desktop = require('./Desktop')
require('../db/db');

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
		desktopCount: async () => Desktop.collection.countDocuments(),
		allDesktops: async (root, args) => {
			// filters
			return Desktop.find({})
		},
		findDesktop: async (root, args) =>
			Desktop.findOne({ name: args.name })
	},

	// Desktop: {...},

	Mutation: {
		addDesktop: async (root, args) => {
			// Create a new desktop.
			const desktop = new Desktop({ ...args })

			try {
				await desktop.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}

			return desktop
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen({ port: 5002 }).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})