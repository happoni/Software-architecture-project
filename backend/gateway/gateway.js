const { ApolloServer } = require("apollo-server")
const { ApolloGateway } = require("@apollo/gateway")
const { readFileSync } = require('fs')

// All subgraphs are combined into supergraph
// When using npm run server -script, gotta give path from backend-folder.
//const supergraphSdl = readFileSync('graphs/supergraph.graphql').toString()
const supergraphSdl = readFileSync('gateway/graphs/supergraph.graphql').toString()
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
