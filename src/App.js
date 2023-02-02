import './App.css'
import { useEffect, useRef, useState } from 'react'

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import * as tt from '@tomtom-international/web-sdk-maps'

const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [longitude, setLongitude] = useState(19.894044)
  const [latitude, setLatitude] = useState(50.054400)

  useEffect(() => {
    let map = tt.map({
      key: process.env.REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true
      },
      center: [longitude, latitude],
      zoom: 16,
    })

    setMap(map)

    const addMarker = () => {

      const popupOffset = {
        bottom: [0, -25]
      }

      let popupText = (longitude == 21.008291141968442 && latitude == 52.22118783000221) ? 'Watch out for the cupcakes!' : 'Here you are!'

      const popup = new tt.Popup({ offset: popupOffset}).setHTML(popupText)
      const element = document.createElement('div')
      element.className = 'marker'

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map)

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        console.log(lngLat)
        setLongitude(lngLat.lng)
        setLatitude(lngLat.lat)
      })
    
      marker.setPopup(popup).togglePopup()
    }

    addMarker()

    return () => map.remove()
  }, [longitude, latitude])


  return (
    <>
      { map && <div className='app'>
        <div ref={mapElement} className='map'></div>
        <div className='search-bar'>
          <h1>Where to?</h1>
          {/* Fix to onSubmit - onChange does not take values less than zero and crashes on other values */}
          <input
            type='text'
            id='longitude'
            className='longitude'
            placeholder='Enter longitude'
            onChange={(e) => { setLongitude(e.target.value) }}
          />
          <input
            type='text'
            id='latitude'
            className='latitude'
            placeholder='Enter latitude'
            onChange={(e) => { setLatitude(e.target.value) }}
          />
        </div>
      </div>}
    </>
  )
}

export default App
