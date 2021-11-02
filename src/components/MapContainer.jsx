import { useState, useCallback, useMemo } from "react";
import * as React from "react";
import Map from "./Map";
import Panel from "./Panel";
import { getBoundingBox, getVisibleCities } from "../utils/geometricUtils";

const MapContainer = () => {
  const [sideLength, setSideLength] = useState(50);
  const [cityNameFilter, setCityNameFilter] = useState("");

  const handleSideLengthChange = useCallback((event) => {
    setSideLength(event.target.value);
  }, []);

  const handleCityNameFilterChange = useCallback((event) => {
    setCityNameFilter(event.target.value);
  }, []);

  const boundingBox = useMemo(() => {
    if (sideLength > 0) {
      return getBoundingBox(sideLength);
    }
  }, [sideLength]);

  const visibleCities = useMemo(() => {
    if (boundingBox) {
      return getVisibleCities(boundingBox, cityNameFilter);
    }
  }, [boundingBox, cityNameFilter]);

  return (
    <>
      <Map cities={visibleCities} boundingBox={boundingBox} />
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
