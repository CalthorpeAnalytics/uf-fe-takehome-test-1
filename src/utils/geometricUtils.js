import { CITY_CENTROID, CITY_FEATURE_COLLECTION } from "./constants/cities";
import bboxPolygon from "@turf/bbox-polygon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { convertFeatureToCityFormat } from "./formatUtils";

const getBoundingBox = (sideLength) => {
  const radius = sideLength / 2;
  const bbox = [
    CITY_CENTROID.geometry.coordinates[0] - radius,
    CITY_CENTROID.geometry.coordinates[1] - radius,
    CITY_CENTROID.geometry.coordinates[0] + radius,
    CITY_CENTROID.geometry.coordinates[1] + radius,
  ];

  return bboxPolygon(bbox);
};

const getVisibleCities = (boundingBox, cityName) => {
  const filteredCities = CITY_FEATURE_COLLECTION.features.filter(
    (feature) =>
      booleanPointInPolygon(feature, boundingBox) &&
      feature.properties.name.toLowerCase().includes(cityName.toLowerCase())
  );

  return filteredCities.map(convertFeatureToCityFormat);
};

export { getBoundingBox, getVisibleCities };
