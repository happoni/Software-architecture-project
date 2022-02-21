import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Desktops from './components/Desktops'

import './App.css';

const ALL_DESKTOPS = gql`
	query {
		desktops {
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
		<div className="container">
			{result.data.desktops.map(d => d.name).join(', ')}
		</div>
	)
}

export default App;


//<Desktops desktops = {result.data.allDesktops}/>