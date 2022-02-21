const { ApolloServer, gql } = require("apollo-server")
const { buildSubgraphSchema } = require("@apollo/subgraph")
const fetch = require("node-fetch")

const port = 4003
const apiUrl = "http://localhost:5003"

const typeDefs = gql`
	type Booking @key(fields: "id") {
		id: ID!
		date: String
		userId: String
		desktopId: String
	}

	extend type Query {
		booking(id: ID!): Booking
		bookings: [Booking]
		bookingsByUser(userId: String!): [Booking]
		bookingsByDesktop(desktopId: String!): [Booking]
	}

	type Mutation {
		addBooking(
			date: String!
			userId: String!
			desktopId: String!
		): Booking
	}
`

const resolvers = {

	Booking: {
		__resolveReference(ref) {
			return fetch(`${apiUrl}/bookings/${ref.id}`).then(res => res.json()) 
		}
	},

	Query: {
		booking(_, { id }) {
			return fetch(`${apiUrl}/bookings/${id}`).then(res => res.json())
		},
		bookings() {
			return fetch(`${apiUrl}/bookings`).then(res => res.json())
		},
		bookingsByUser(_, { userId }) {
			return fetch(`${apiUrl}/bookings`)
				.then(res => res.json())
				.then(json => json.filter(b => {
					return b.userId === userId
				}))
		},
		bookingsByDesktop(_, { desktopId }) {
			return fetch(`${apiUrl}/bookings`)
			.then(res => res.json())
			.then(json => json.filter(b => {
				return b.desktopId === desktopId
			}))
		}
	},

	Mutation: {
		addBooking(_, { date, userId, desktopId }) {
			const booking = {
				date: date,
				userId: userId,
				desktopId: desktopId,
			}

			return fetch(`${apiUrl}/booking`, {
				method: 'POST',
				body: JSON.stringify(booking),
				headers: { 'Content-Type': 'application/json'}
			}).then(res => res.json())
		}
	}
}

const server = new ApolloServer({
	schema: buildSubgraphSchema([{ typeDefs, resolvers }])
})

server.listen(port).then(({ url }) => {
	console.log(`Booking service ready at ${url}`)
})
