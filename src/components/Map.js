import { useState } from "react";
import ReactMapGL, { Popup, Source, Layer } from "react-map-gl";
import Pins from "./Pins";
import CityInfo from "./CityInfo";

const REACT_APP_MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYnJhZGxleWJvc3NhcmR1ZiIsImEiOiJja3NoeWR2ODkxemFoMnBwYTM1emhhYmU4In0.etmCrrx1r0vece_U8jvwFw";

function Map(props) {
  const { boundingBox, cities } = props;
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -102.4376,
    zoom: 3,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  // this geojson polygon can be used to visualize the boundaries of the bounding box
  const layerStyle = {
    id: "outline",
    type: "line",
    paint: {
      "line-color": "#007cbf",
      "line-width": 3,
    },
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      width="100vw"
      height="100vh"
      mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <Pins data={cities} onClick={setPopupInfo} />

      <Source id="my-data" type="geojson" data={boundingBox}>
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
  );
}

export default Map;
