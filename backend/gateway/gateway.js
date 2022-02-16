const { ApolloServer } = require("apollo-server")
const { ApolloGateway } = require("@apollo/gateway")
const { readFileSync } = require('fs')

// All subgraphs are combined into supergraph
const supergraphSdl = readFileSync('graphs/supergraph.graphql').toString()
const port = 4000

const gateway = new ApolloGateway({
	supergraphSdl,
})

const server = new ApolloServer({
	gateway,
})

server.listen(port).then(({ url }) => {
	console.log(`Gateway server ready at ${url}`)
}).catch(err => {console.error(err)})
