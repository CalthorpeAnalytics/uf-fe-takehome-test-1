import CITIES from "./cities.json";
import { featureCollection, point } from "@turf/helpers";
import centroid from "@turf/centroid";

const CITY_FEATURE_COLLECTION = featureCollection(
  CITIES.map(({ latitude, longitude, name, population, image, state }) => {
    return point([longitude, latitude], {
      name,
      population,
      image,
      state,
    });
  })
);

const CITY_CENTROID = centroid(CITY_FEATURE_COLLECTION);

export { CITY_CENTROID, CITY_FEATURE_COLLECTION };
