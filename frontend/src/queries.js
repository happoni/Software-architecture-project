import { gql } from '@apollo/client'

export const ALL_USERS = gql`
	query {
		users {
			username
			email
			id
		}
	}
`

export const CREATE_USER = gql`
	mutation addUser(
		$username: String!
		$email: String!
	) {
		addUser(username: $username, email: $email) {
			username
			email
		}
	}
`

export const ALL_DESKTOPS = gql`
	query {
		desktops {
			name
			location
			id
		}
	}
`

export const CREATE_DESKTOP = gql`
	mutation addDesktop(
		$name: String!
		$location: String!
	) {
		addDesktop(name: $name, location: $location) {
			name
			location
		}
	}
`