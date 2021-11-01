import { useState, useEffect } from "react";
import * as React from "react";
import Map from "./Map";
import Panel from "./Panel";
import { getBoundingBox, getVisibleCities } from "../utils/geometricUtils";

const MapContainer = () => {
  const [sideLength, setSideLength] = useState(50);
  const [cityNameFilter, setCityNameFilter] = useState("");
  const [boundingBox, setBoundingBox] = useState(getBoundingBox(sideLength));
  const [cities, setCities] = useState(
    getVisibleCities(boundingBox, cityNameFilter)
  );

  const handleSideLengthChange = (event) => {
    setSideLength(event.target.value);
  };

  const handleCityNameFilterChange = (event) => {
    setCityNameFilter(event.target.value);
  };

  useEffect(() => {
    setBoundingBox(getBoundingBox(sideLength));
  }, [sideLength]);

  useEffect(() => {
    setCities(getVisibleCities(boundingBox, cityNameFilter));
  }, [boundingBox, cityNameFilter]);

  return (
    <>
      <Map cities={cities} boundingBox={boundingBox} />
      <Panel
        sideLength={sideLength}
        handleSideLengthChange={handleSideLengthChange}
        cityNameFilter={cityNameFilter}
        handleCityNameFilterChange={handleCityNameFilterChange}
      />
    </>
  );
};

export default React.memo(MapContainer);
