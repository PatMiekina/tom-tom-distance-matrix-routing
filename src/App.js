import { useEffect, useRef, useState } from 'react'
import './App.css'

import * as tt from '@tomtom-international/web-sdk-maps'

const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const latitude = 50.054400
  const longitude = 19.894044

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      center: [longitude, latitude],
      zoom: 14,
    })

    setMap(map)
  }, [])


  return (
    <div className="App">
      <div ref={mapElement} className="map"></div>
    </div>
  )
}

export default App
