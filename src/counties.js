import React from "react";
import { Source, Layer } from "react-map-gl";
// import * as geoData from "./data/geoJson/ne_110m_admin_1_states_provinces.geojson";
// import topojson from "topojson";

// const county_layer = {
//   id: "counties-layer",
//   source: "counties",
//   type: "line",
//   interactive: false,
//   paint: {
//     "fill-opacity": 0.25,
//     "fill-outline-color": "rgba(200,0,0,0.5)",
//   },
// };

// function getCountySource() {
//   //   const features = geoData;
//   const features = { url: "mapbox://mapbox.82pkq93d" };
//   console.log(features);
//   return features;
// }

function CountyRender() {
  // <Source id="counties" type="vector" url="mapbox://mapbox.82pkq93d">
  //   <Layer source-layer="county" {...county_layer} />
  // </Source>
  return (
    <div>
      <Source id="contours" type="vector" url="mapbox://mapbox.82pkq93d" />
      <Layer
        id="contours"
        type="line"
        source="contours"
        source-layer="original"
        paint={{
          "line-color": "#877b59",
          "line-width": 1,
        }}
      />
    </div>
  );
}

export default CountyRender;
