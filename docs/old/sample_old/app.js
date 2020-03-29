const api_config = require("../api_config");
mapboxgl = async function() {
  let mapboxgl = await require("mapbox-gl@0.43.0");
  mapboxgl.accessToken = api_config.KEY_MAPBOX;
  return mapboxgl;
};
h3 = require("h3-js");
geojson2h3 = require("geojson2h3");
console.log("Successfully imported modules!");
