import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from './Map';
import Panel from './Panel'
import './App.css';

function App() {

  const [sideLength, setSideLength] = useState(0)
  const [cityFilter, setCityFilter] = useState('')

  const onBboxChange = evt => setSideLength(evt.target.value)
  const onCityFilterChange = evt => setCityFilter(evt.target.value)

  return (
    <div className="App">
      <Map sideLength={sideLength} cityFilter={cityFilter} />
      <Panel onBboxChange={onBboxChange} onCityFilterChange={onCityFilterChange} />
    </div>
  );
}

export default App;
