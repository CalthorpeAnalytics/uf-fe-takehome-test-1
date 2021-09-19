import * as React from 'react';

function Panel(props) {

  return (
    <div className="panel">

      <div className="input" onChange={props.onBboxChange}>
        <label>Bounding Square Side Length (km)</label>
        <input
          type="number"
        />
      </div>

      <div className="input" onChange={props.onCityFilterChange}>
        <label>City Name Filter</label>
        <input
          type="string"
        />
      </div>

    </div>
  );
}

export default React.memo(Panel);