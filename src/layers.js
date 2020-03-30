import { geoToH3, kRing } from "h3-js";
// @ts-ignore
import geojson2h3 from "geojson2h3";

// ======================================================
// GENERATE HEX GEOJSON

function generate_hex_geojson(lat, lon, lvl) {
  const centerHexID = geoToH3(lat, lon, lvl);
  const kRingHexIDs = kRing(centerHexID, lvl);
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

function hexRender(zoomLvl, viewportBoundingBox) {
  // render necessary hex source/layer pairs
  // for a given bounding box and zoom level
  // =============================================
  // return a render() function, acts like component
  // render params of form:
  // <Source id="h3-hexes" type="geojson" data={hex_6}>
  //   <Layer {...hex_layer} />
  // </Source>
  // <Source id="h3-hexes" type="geojson" data={hex_4}>
  //   <Layer {...hex_layer} />
  // </Source>
}

export default hexRender;
