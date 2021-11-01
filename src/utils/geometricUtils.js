import { CITY_CENTROID, CITY_FEATURE_COLLECTION } from "./constants/cities";
import bbox from "@turf/bbox";
import bboxPolygon from "@turf/bbox-polygon";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import { convertFeatureToCityFormat } from "./formatUtils";
import buffer from "@turf/buffer";
import square from "@turf/square";

const getBoundingBox = (sideLength) => {
  const radius = sideLength / 2;
  const bufferedCentroid = buffer(CITY_CENTROID, radius, {
    units: "degrees",
  });
  const squareBoundingBox = square(bbox(bufferedCentroid));
  return bboxPolygon(squareBoundingBox);
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
