import { useState, useEffect } from "react";
import * as React from "react";
import Map from "./Map";
import Panel from "./Panel";
import { getBoundingBox, getVisibleCities } from "../utils/geometricUtils";

const MapContainer = () => {
  const [sideLength, setSideLength] = useState(null);
  const [cityNameFilter, setCityNameFilter] = useState("");
  const [boundingBox, setBoundingBox] = useState(null);
  const [cities, setCities] = useState([]);

  const handleSideLengthChange = (event) => {
    setSideLength(event.target.value);
  };

  const handleCityNameFilterChange = (event) => {
    setCityNameFilter(event.target.value);
  };

  useEffect(() => {
    setSideLength(50);
  }, []);

  useEffect(() => {
    if (sideLength > 0) {
      setBoundingBox(getBoundingBox(sideLength));
    }
  }, [sideLength]);

  useEffect(() => {
    if (boundingBox) {
      setCities(getVisibleCities(boundingBox, cityNameFilter));
    }
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
