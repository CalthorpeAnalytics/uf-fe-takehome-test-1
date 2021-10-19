import React from 'react'

function Panel ({
  bounds,
  cityFilter,
  onBoundsChange,
  onCityFilterChange
}) {
  return (
    <div className="panel">

      <div className="input">
        <label>Bounding Square Side Length</label>
        <input
          onChange={e => onBoundsChange(Number(e.target.value))}
          type="number"
          value={bounds}
          min='0'
        />
      </div>

      <div className="input">
        <label>City Name Filter</label>
        <input
          onChange={e => onCityFilterChange(e.target.value)}
          type="string"
          value={cityFilter}
        />
      </div>

    </div>
  )
}

export default React.memo(Panel)
