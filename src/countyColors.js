import React from "react";
import { Layer } from "react-map-gl";

class CountyColors extends React.Component {
  constructor() {
    super();
    this.state = {
      colors: {},
      error: null,
    };
  }

  componentDidMount() {
    console.log("Did mount");
    let url = "https://internal.chattadata.org/resource/unyk-9b2k.json";
    fetch(url)
      .then((response) => response.json())
      .then(this.buildLayer)
      .catch((error) => {
        this.setState({ error });
      });
  }

  buildLayer(data) {
    console.log(data);
    var expression = ["match", ["get", "fips"]];
    data.forEach((row) => {
      var red = (row["cases"] / 100000) * 255;
      var color = "rgba(" + 0 + ", " + 0 + ", " + red + ", 0.5)";
      expression.push(row["fips"], color);
    });
    expression.push("rgba(0,0,0,0)");
    // console.log(expression);

    const colors = {
      id: "counties",
      source: "counties",
      type: "fill",
      "source-layer": "state_county_population_2014_cen",
      interactive: false,
      paint: {
        "fill-color": expression,
        "fill-outline-color": "rgba(0,0,0,0.5)",
      },
    };
    this.setState({ colors });
    // console.log(this.state.colors);
  }

  render() {
    return (
      <div>
        <Layer {...this.state.colors} />
      </div>
    );
  }
}

export default CountyColors;
