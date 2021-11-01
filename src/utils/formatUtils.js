const convertFeatureToCityFormat = (cityFeature) => {
  const {
    geometry: {
      coordinates: [longitude, latitude],
    },
    properties: { name, population, image, state },
  } = cityFeature;

  return {
    longitude,
    latitude,
    name,
    population,
    image,
    state,
  };
};

export { convertFeatureToCityFormat };
