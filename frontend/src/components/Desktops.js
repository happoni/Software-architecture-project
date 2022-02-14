import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const FIND_DESKTOP = gql`
  query findDesktopByName($nameToSearch: String!) {
    findDesktop(name: $nameToSearch) {
      name
      location
      id
    }
  }
`

const Desktops = ({ desktops }) => {
  const [getDesktop, result] = useLazyQuery(FIND_DESKTOP) 
  const [desktop, setDesktop] = useState(null)

  const showDesktop = (name) => {
    getDesktop({ variables: { nameToSearch: name } })
  }

  useEffect(() => {
    if (result.data) {
      setDesktop(result.data.findDesktop)
    }
  }, [result])

  if (desktop) {
    return(
      <div>
        <h2>{desktop.name}</h2>
        <div>{desktop.address.street} {desktop.address.city}</div>
        <div>{desktop.phone}</div>
        <button onClick={() => setDesktop(null)}>close</button>
      </div>
    )
  }
  
  return (
    <div>
      <h2>Desktops</h2>
      {desktops.map(p =>
        <div key={p.name}>
          {p.name} {p.location}
          <button onClick={() => showDesktop(p.name)} >
            show location
          </button> 
        </div>  
      )}
    </div>
  )
}

export default Desktops