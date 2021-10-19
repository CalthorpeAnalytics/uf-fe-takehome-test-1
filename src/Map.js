import React, { useState } from 'react'
import ReactMapGL, { Popup, Source, Layer } from 'react-map-gl'
import Pins from './Pins'
import CityInfo from './CityInfo'
import cities, { latitudes, longitudes } from './cities'

const REACT_APP_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYnJhZGxleWJvc3NhcmR1ZiIsImEiOiJja3NoeWR2ODkxemFoMnBwYTM1emhhYmU4In0.etmCrrx1r0vece_U8jvwFw'

function getCenterPoint () {
  const minLat = Math.min(...latitudes)
  const maxLat = Math.max(...latitudes)
  const minLong = Math.min(...longitudes)
  const maxLong = Math.max(...longitudes)

  return new DOMPoint(
    (maxLong + minLong) / 2,
    (maxLat + minLat) / 2
  )
}

function getBoundingRectFromCenter (center, bounds) {
  // Create a slight offset of bounds to lat/long degrees.
  const offset = 0.5
  bounds *= offset

  return {
    nw: [center.x - bounds, center.y + bounds],
    ne: [center.x + bounds, center.y + bounds],
    se: [center.x + bounds, center.y - bounds],
    sw: [center.x - bounds, center.y - bounds]
  }
}

function Map ({ bounds, cityFilter }) {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -102.4376,
    zoom: 3
  })

  const [popupInfo, setPopupInfo] = useState(null)

  // Find the center point and the bounding box around it.
  const center = getCenterPoint()
  const rect = getBoundingRectFromCenter(center, bounds)

  // Filter out cities that are outside the bounds or filtered by name.
  const filteredCities = cities
    .filter(city =>
      city.longitude >= rect.nw[0] &&
      city.longitude <= rect.se[0] &&
      city.latitude >= rect.se[1] &&
      city.latitude <= rect.nw[1]
    )
    .filter(city =>
      !cityFilter ||
      city.name.toLowerCase().includes(cityFilter.toLowerCase().trim())
    )

  // this geojson polygon can be used to visualize the boundaries of the bounding box
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              rect.nw,
              rect.ne,
              rect.se,
              rect.sw,
              rect.nw
            ]
          ]
        }
      }
    ]
  }

  const layerStyle = {
    id: 'outline',
    type: 'line',
    paint: {
      'line-color': '#007cbf',
      'line-width': 3
    }
  }

  return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        width="100vw"
        height="100vh"
        mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(viewport) => setViewport(viewport)}
      >

      <Pins data={filteredCities} onClick={setPopupInfo} />

      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>

      {popupInfo && (

        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={setPopupInfo}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )}
      </ReactMapGL>
  )
}

export default Map
