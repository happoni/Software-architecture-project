import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Desktops from './components/Desktops'

import './App.css';

const ALL_DESKTOPS = gql`
	query {
		allDesktops {
			name
			location
		}
	}
`

const App = () => {
	const result = useQuery(ALL_DESKTOPS)

	if (result.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<Desktops desktops = {result.data.allDesktops}/>
		</div>
	)
}

export default App;
