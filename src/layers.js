import React from "react";
import WebMercatorViewport from "viewport-mercator-project";
import { geoToH3, kRing } from "h3-js";
// @ts-ignore
import geojson2h3 from "geojson2h3";

// ======================================================
// GENERATE HEX GEOJSON

function generate_hex_geojson(lat, lon, lvl) {
  const centerHexID = geoToH3(lat, lon, lvl);
  const kRingHexIDs = kRing(centerHexID, 1);
  const Hexes = kRingHexIDs.reduce(
    (res, hexagon) => ({ ...res, [hexagon]: Math.random() }),
    {}
  );
  const hexGeojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(Hexes),
    hex => ({
      value: Hexes[hex]
    })
  );
  return hexGeojson;
}

export const hex_4 = generate_hex_geojson(37.8, -122.4, 4);
export const hex_6 = generate_hex_geojson(37.8, -122.4, 6);

export const hex_layer = {
  id: "h3-hexes-layer",
  source: "h3-hexes",
  type: "fill",
  interactive: false,
  paint: {
    "fill-opacity": 0.25,
    "fill-outline-color": "rgba(0,0,0,0.5)"
  }
};

function determine_resolution(height) {
  resolution = height;
  return resolution;
}

function getHexIdsInView(width, height, resolution) {
  const { width, height } = viewport;
  const projection = new WebMercatorViewport(viewport);
  const [west, north] = projection.unproject([0, 0]);
  const [east, south] = projection.unproject([width, height]);
  const nw = [north, west];
  const ne = [north, east];
  const sw = [south, west];
  const se = [south, east];
  const hexIDs = h3.polyfill([nw, ne, se, sw], resolution);
  return hexIDs;
}

function hexRender(viewport) {
  // render necessary hex source/layer pairs
  // for a given bounding box and zoom level
  // =============================================
  const { width, height } = viewport;
  const resolution = determine_resolution(height);
  hexIDs = getHexIdsInView(width, height, resolution);
  // Assign color values to each hex (default=0.5)
  const hexObjects = hexIDs.reduce(
    (res, hexagon) => ({ ...res, [hexagon]: 0.5 }),
    {}
  );
  const hexGeojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(hexObjects),
    hex => ({
      value: hexObjects[hex]
    })
  );
  // return a render() function, acts like component
  // render params of form:
  // <Source id="h3-hexes" type="geojson" data={hex_6}>
  //   <Layer {...hex_layer} />
  // </Source>
  // <Source id="h3-hexes" type="geojson" data={hex_4}>
  //   <Layer {...hex_layer} />
  // </Source>
  return 0;
}

export default hexRender;
