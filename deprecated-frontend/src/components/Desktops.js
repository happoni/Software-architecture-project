import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

import { ALL_DESKTOPS } from '../queries'

const Desktops = ({ desktops }) => {
  const [getDesktop, result] = useLazyQuery(ALL_DESKTOPS) 
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