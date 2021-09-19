import { useState } from 'react';
import ReactMapGL, { Popup, Source, Layer } from 'react-map-gl';
import Pins from './Pins';
import CityInfo from './CityInfo';
import CITIES from './cities.json';
import booleanIntersects from '@turf/boolean-intersects';
import centroid from '@turf/centroid';
import destination from '@turf/destination';
import { point, featureCollection } from '@turf/helpers';

const REACT_APP_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYnJhZGxleWJvc3NhcmR1ZiIsImEiOiJja3NoeWR2ODkxemFoMnBwYTM1emhhYmU4In0.etmCrrx1r0vece_U8jvwFw';

function Map (props) {

  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -102.4376,
    zoom: 3 
  });

  const [popupInfo, setPopupInfo] = useState(null);

  // map the CITIES into geojson so our utility lib can handle them
  const cityGeoms = CITIES.map(({ latitude, longitude }) => point([longitude, latitude]))
  const cityCentroid = centroid(featureCollection(cityGeoms))

  //get dimensions of bbox from cardinal directions
  const getDim = bearing => destination(cityCentroid, props.sideLength / 2, bearing).geometry.coordinates

  const minX = getDim(270)[0]
  const minY = getDim(180)[1]
  const maxX = getDim(90)[0]
  const maxY = getDim(0)[1]

  // this geojson polygon can be used to visualize the boundaries of the bounding box
  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [
                minX,
                minY
              ],
              [
                maxX,
                minY
              ],
              [
                maxX,
                maxY
              ],
              [
                minX,
                maxY
              ],
              [
                minX,
                minY
              ]
            ]
          ]
        }
      }
    ]
  };
  
  const layerStyle = {
    id: 'outline',
    type: 'line',
    paint: {
      'line-color': '#007cbf',
      'line-width': 3
    }
  };

  // set up a reusable spatial filter func to minimize repetition
  const spatialFilter = (city) => booleanIntersects(point([city.longitude, city.latitude]), geojson.features[0].geometry)

  // Filter the cities based on out input params. Always filter with bbox but only filter with the name if one is entered.
  const filteredCities = props.cityFilter
    ? CITIES.filter(city => city.name.toLowerCase().includes(props.cityFilter.toLowerCase()) && spatialFilter(city))
    : CITIES.filter(spatialFilter)

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
  );
 }

 export default Map;