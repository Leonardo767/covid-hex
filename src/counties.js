import React from "react";
import { Source, Layer } from "react-map-gl";
// import CountyColors from "./countyColors";
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
// <Source id="counties" type="vector" url="mapbox://mapbox.82pkq93d">
//   <Layer source-layer="county" {...county_layer} />
// </Source>

// county source vector link: mapbox://mapbox.82pkq93d

class CountyRender extends React.Component {
  constructor() {
    super();
    this.state = {
      county_colors: {},
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    console.log("Did mount in counties.js");
    const url =
      "https://internal.chattadata.org/resource/unyk-9b2k.json?date=2020-01-21T00:00:00.000";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          county_colors: this.buildLayer(json),
        });
      });
  }

  buildLayer(data) {
    console.log(data);
    var expression = ["match", ["get", "GEOID"]];
    data.forEach((row) => {
      var red = row["cases"] * 255;
      var color = "rgba(" + red + ", " + 0 + ", " + 0 + ", 0.5)";
      expression.push(row["fips"], color);
    });
    expression.push("rgba(0,0,0,0)");

    // const county_colors = {
    //   id: "counties",
    //   source: "counties",
    //   type: "fill",
    //   // "source-layer": "state_county_population_2014_cen",
    //   interactive: false,
    //   paint: {
    //     "fill-color": expression[0],
    //     "fill-outline-color": "rgba(0,0,0,0.5)",
    //   },
    // };
    return expression;
  }

  render() {
    // console.log(this.state.county_colors);

    return (
      <div>
        <Source
          id="counties"
          type="geojson"
          data="https://raw.githubusercontent.com/lobenichou/dataForGuides/master/countiesAndResults.geojson"
          generateId={true}
        />
        {/* <Source
          id="covid"
          type="json"
          url="https://internal.chattadata.org/resource/unyk-9b2k.json"
        /> */}
        {/* <Layer {...layer_define} /> */}
        <Layer
          id="counties"
          type="fill"
          source="counties"
          // source-layer="state_county_population_2014_cen"
          paint={{
            "fill-color": this.state.county_colors,
            "fill-outline-color": "rgba(0,0,0,0.5)",
            // "line-color": "rgba(158, 158, 158, 0.5)",
            // "line-width": 1,
          }}
        />
        {/* <Layer {...this.state.county_colors} /> */}
      </div>
    );
  }
}

export default CountyRender;
