import React from "react";
import { Source, Layer } from "react-map-gl";
import * as geoData from "./data/geoJson/ne_110m_admin_1_states_provinces.geojson";
// import topojson from "topojson";

const county_layer = {
  id: "counties-layer",
  source: "counties",
  type: "fill",
  interactive: false,
  paint: {
    "fill-opacity": 0.25,
    "fill-outline-color": "rgba(200,0,0,0.5)",
  },
};

function getCountySource() {
  const features = geoData;
  return features;
}

function CountyRender() {
  return (
    <Source id="counties" type="geojson" data={getCountySource()}>
      <Layer {...county_layer} />
    </Source>
  );
}

export default CountyRender;
