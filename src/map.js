import React, { useState, Component } from "react";
import ReactMapGL, { Layer } from "react-map-gl";

class Map extends Component {
  constructor(props) {
    super(props);
    this.lat0 = 32;
    this.lon0 = -97;
    this.zoom0 = 7;
    const viewport = {
      latitude: this.lat0,
      longitude: this.lon0,
      width: "100vw",
      height: "100vh",
      zoom: this.zoom0
    };
    this.state = {
      viewport: viewport
    };
  }

  setViewport(viewport) {
    this.setState({ viewport: viewport });
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
          this.setViewport(viewport);
        }}
      ></ReactMapGL>
    );
  }
}

export default Map;

// const [viewport, setViewport] = useState({
//   latitude: 32,
//   longitude: -97,
//   width: "100vw",
//   height: "100vh",
//   zoom: 7
// });

// console.log(create_hexagons(-122.4, 37.7923539));

// return <div></div>;
