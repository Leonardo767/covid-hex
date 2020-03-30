h3 = require("h3-js");
geojson2h3 = require("geojson2h3");

// ==========================================================================================================================
// ref: https://stackoverflow.com/questions/56646664/how-can-i-get-the-h3-hexagons-on-a-react-map-gl-deck-gl-viewport
// author: nrabinowitz (StackOverFlow user, head dev for h3-js)

import WebMercatorViewport from "viewport-mercator-project";

function bboxFromViewport(viewport) {
  const { width, height } = viewport;
  const projection = new WebMercatorViewport(viewport);
  const [west, north] = projection.unproject([0, 0]);
  const [east, south] = projection.unproject([width, height]);
  return { north, south, east, west };
}

const nw = [north, west];
const ne = [north, east];
const sw = [south, west];
const se = [south, east];
const hexes = h3.polyfill([nw, ne, se, sw], resolution);

// Inexact, but it doesn't matter for our purposes
const KM_PER_DEGREE_LAT = 111.2;

function estimateHexagonsInBBox(bbox, width, height, res) {
  // This is an extremely rough estimate, but we're just trying
  // to get a reasonable order of magnitude
  const aspect = width / height;
  const latKm = (bbox.north - bbox.south) * KM_PER_DEGREE_LAT;
  const lonKm = latKm * aspect;
  return (latKm * lonKm) / h3.hexArea(res, h3.UNITS.km2);
}
// ==========================================================================================================================

// ==========================================================================================================================
// ref: https://observablehq.com/@nrabinowitz/h3-tutorial-heatmap-rendering
// author: nrabinowitz (StackOverFlow user, head dev for h3-js)

function renderHexes(map, hexagons) {
  // Transform the current hexagon map into a GeoJSON object
  const geojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(hexagons),
    hex => ({ value: hexagons[hex] })
  );

  const sourceId = "h3-hexes";
  const layerId = `${sourceId}-layer`;
  let source = map.getSource(sourceId);

  // Add the source and layer if we haven't created them yet
  if (!source) {
    map.addSource(sourceId, {
      type: "geojson",
      data: geojson
    });
    map.addLayer({
      id: layerId,
      source: sourceId,
      type: "fill",
      interactive: false,
      paint: {
        "fill-outline-color": "rgba(0,0,0,0)"
      }
    });
    source = map.getSource(sourceId);
  }

  // Update the geojson data
  source.setData(geojson);

  // Update the layer paint properties, using the current config values
  map.setPaintProperty(layerId, "fill-color", {
    property: "value",
    stops: [
      [0, config.colorScale[0]],
      [0.5, config.colorScale[1]],
      [1, config.colorScale[2]]
    ]
  });

  map.setPaintProperty(layerId, "fill-opacity", config.fillOpacity);
}

function renderAreas(map, hexagons, threshold) {
  // Transform the current hexagon map into a GeoJSON object
  const geojson = geojson2h3.h3SetToFeature(
    Object.keys(hexagons).filter(hex => hexagons[hex] > threshold)
  );

  const sourceId = "h3-hex-areas";
  const layerId = `${sourceId}-layer`;
  let source = map.getSource(sourceId);

  // Add the source and layer if we haven't created them yet
  if (!source) {
    map.addSource(sourceId, {
      type: "geojson",
      data: geojson
    });
    map.addLayer({
      id: layerId,
      source: sourceId,
      type: "line",
      interactive: false,
      paint: {
        "line-width": 3,
        "line-color": config.colorScale[2]
      }
    });
    source = map.getSource(sourceId);
  }

  // Update the geojson data
  source.setData(geojson);
}
// ==========================================================================================================================
