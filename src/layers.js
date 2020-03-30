import { geoToH3, kRing } from "h3-js";
// @ts-ignore
import geojson2h3 from "geojson2h3";
// geojson2h3 = require("https://bundle.run/geojson2h3");

export const layer_example = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf"
  }
};

export const geojson_example = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [-122.4, 37.8] }
    }
  ]
};

// ======================================================
// GENERATE HEX GEOJSON

function create_hexagons(lon, lat) {
  const centerHex = geoToH3(lat, lon, 8);
  const kRing_res = kRing(centerHex, 3);
  // Reduce hexagon list to a map with random values
  return kRing_res.reduce(
    (res, hexagon) => ({ ...res, [hexagon]: Math.random() }),
    {}
  );
}

function create_hex_geojson(hexagons) {
  const geojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(hexagons),
    hex => ({
      value: hexagons[hex]
    })
  );
  console.log(geojson);
  console.log("returning geojson hex...");
  return geojson;
}

function create_hex_geojson_areas(hexagons) {
  const geojson = geojson2h3.h3SetToFeature(
    Object.keys(hexagons).filter(hex => hexagons[hex] > 0.2)
  );
  console.log(geojson);
  console.log("returning geojson hex...");
  return geojson;
}

export const hex_geojson = create_hex_geojson_areas(
  create_hexagons(-122.4, 37.8)
);

export const hex_layer = {
  id: "h3-hexes-layer",
  source: "h3-hexes",
  type: "fill",
  interactive: false,
  paint: {
    "fill-outline-color": "rgba(255,0,0,0.5)"
  }
};
