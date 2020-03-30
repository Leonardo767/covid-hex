import React, { Component } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import {
  layer_example,
  geojson_example,
  hex_geojson,
  hex_layer
} from "./layers";

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
    // initialize viewport
    this.state = {
      viewport: viewport
    };
  }

  setViewport(viewport) {
    // updates viewport upon panning, scrolling, etc.
    this.setState({ viewport: viewport });
  }

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        // specify API token and controller for ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
          this.setViewport(viewport);
        }}
      >
        {/* <Source id="my-data" type="geojson" data={geojson_example}>
          <Layer {...layer_example} />
        </Source> */}
        <Source id="h3-hexes" type="geojson" data={hex_geojson}>
          <Layer {...hex_layer} />
        </Source>
      </ReactMapGL>
    );
  }
}

export default Map;
