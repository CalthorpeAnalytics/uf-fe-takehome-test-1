import React, { useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map from './Map'
import Panel from './Panel'
import './App.css'

function App () {
  const [bounds, setBounds] = useState(50)
  const [cityFilter, setCityFilter] = useState('')

  function handleBoundsChange (newValue) {
    setBounds(newValue)
  }

  function handleCityFilterChange (newValue) {
    setCityFilter(newValue)
  }

  return (
    <div className="App">
      <Map
        bounds={bounds}
        cityFilter={cityFilter}
      />
      <Panel
        bounds={bounds}
        cityFilter={cityFilter}
        onBoundsChange={handleBoundsChange}
        onCityFilterChange={handleCityFilterChange}
      />
    </div>
  )
}

export default App
