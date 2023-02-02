import { useEffect, useRef, useState } from 'react'
import './App.css'

import * as tt from '@tomtom-international/web-sdk-maps'

const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
    })

    setMap(map)
  }, [])


  return (
    <div className="App">
      {/* <h1>Hi!</h1> */}
      <div ref={mapElement}></div>
    </div>
  )
}

export default App
