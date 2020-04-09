import React, { useState } from "react";
import { Source, Layer } from "react-map-gl";
import WebMercatorViewport from "viewport-mercator-project";
import { polyfill } from "h3-js";
// @ts-ignore
import geojson2h3 from "geojson2h3";
import renderAllLargeHexes from "./nationalBoundaries";
import * as countryInfo from "./data/map-settings-by-country.json";
// ======================================================
// GENERATE HEX GEOJSON

const hex_layer = {
  id: "h3-hexes-layer",
  source: "h3-hexes",
  type: "fill",
  interactive: false,
  paint: {
    "fill-opacity": 0.25,
    "fill-outline-color": "rgba(0,0,0,0.5)",
  },
};

function determine_resolution(zoom) {
  // schedule resolution and render bound according to zoom lvl
  var resolution = 2;
  var view_boundaries = -2;
  if (zoom < 6) {
    resolution = 2;
    view_boundaries = -2;
  } else if (zoom === 6) {
    resolution = 3;
    view_boundaries = -2;
  } else if (zoom === 7) {
    resolution = 4;
    view_boundaries = -2;
  } else if (zoom === 8) {
    resolution = 4;
    view_boundaries = -2;
  } else {
    resolution = 5;
    view_boundaries = -2;
  }

  return [view_boundaries, resolution];
}

function getHexIdsInView(viewport, countrySelected) {
  const latitude = viewport.latitude;
  const longitude = viewport.longitude;
  const zoom = Math.floor(viewport.zoom);
  const [view_boundaries, resolution] = determine_resolution(zoom);
  const options = {
    latitude: latitude,
    longitude: longitude,
    zoom: view_boundaries,
  };
  const projection = new WebMercatorViewport(options);
  const [west, north] = projection.unproject([0, 0]);
  const [east, south] = projection.unproject([1, 1]);
  const nw = [north, west];
  const ne = [north, east];
  const sw = [south, west];
  const se = [south, east];
  console.log(zoom);

  // console.log(nw);
  // console.log(se);
  // filter by whether in country if zoomed out enough
  let hexIDs;
  if (zoom < 6) {
    hexIDs = renderAllLargeHexes(countrySelected);
  } else {
    hexIDs = polyfill([nw, ne, se, sw], resolution);
  }
  // console.log(hexIDs);
  return hexIDs;
}

function getHexGeoJson(viewport, countrySelected) {
  // console.log(countrySelected);
  // console.log(viewport);
  const hexIDs = getHexIdsInView(viewport, countrySelected);
  // Assign color values to each hex (default=0.5)
  const hexObjects = hexIDs.reduce(
    (res, hexagon) => ({ ...res, [hexagon]: 0.5 }),
    {}
  );
  const hexGeojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(hexObjects),
    (hex) => ({
      value: hexObjects[hex],
    })
  );
  return hexGeojson;
}

function HexRender(props) {
  return (
    <Source
      id="h3-hexes"
      type="geojson"
      data={getHexGeoJson(props.viewport, props.countrySelected)}
    >
      <Layer {...hex_layer} />
    </Source>
  );
}

export default HexRender;
