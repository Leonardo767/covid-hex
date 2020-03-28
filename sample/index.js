api_config = require("../api_config.js");

mapboxgl = require("mapbox-gl@0.43.0");
mapboxgl.accessToken = api_config.KEY_MAPBOX;

// mapboxgl = {
//     let mapboxgl = await require('mapbox-gl@0.43.0');
//     mapboxgl.accessToken = mapboxApiToken;
//     return mapboxgl;
//   }

h3 = require("h3-js");

geojson2h3 = require("https://bundle.run/geojson2h3@1.0.1");
