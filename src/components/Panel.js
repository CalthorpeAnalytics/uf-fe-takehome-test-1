import * as React from "react";

function Panel(props) {
  const {
    sideLength,
    handleSideLengthChange,
    cityNameFilter,
    handleCityNameFilterChange,
  } = props;

  return (
    <div className="panel">
      <div className="input">
        <label>Bounding Square Side Length</label>
        <input
          type="number"
          onChange={handleSideLengthChange}
          value={sideLength}
        />
      </div>

      <div className="input">
        <label>City Name Filter</label>
        <input
          type="string"
          value={cityNameFilter}
          onChange={handleCityNameFilterChange}
        />
      </div>
    </div>
  );
}

export default React.memo(Panel);
