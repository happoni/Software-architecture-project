// const { Apolloserver, UserInputError, AuthenticationError, gql} = require('apollo-server')
const { ApolloServer, gql} = require('apollo-server')
// const { v1: uuid } = require('uuid')
// const jwt = require('jsonwebtoken')

//const mongoose = require('mongoose')
//const Desktop = require('./Desktop')
//require('../db/db');

// const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


let desktops = [
	{
		name: "D-01",
		location: "D-wing",
	},
	{
		name: "D-02",
		location: "D-wing",
	},
	{
		name: "D-03",
		location: "D-wing",
	},
]

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
`

const resolvers = {
	Query: {
		desktopCount: () => desktops.length,
		allDesktops: () => desktops,
		findDesktop: (root, args) =>
			desktops.find(d => d.name === args.name)
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})