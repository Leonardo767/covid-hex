import React, { useState, createRef } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  WebMercatorViewport
} from "react-map-gl";
import { easeCubic } from "d3-ease";
import Search from "./components/Search";
import HexRender from "./layers";
import { Point } from "./api/mapbox"; // eslint-disable-line

class Map extends React.Component {
  // const {} = props;
  constructor(props) {
    super(props)
    this._map = createRef()
    this.state = {
      viewport: {
        latitude: 33.9137,
        longitude: -98.4934,
        width: "100vw",
        height: "100vh",
        zoom: 7
      },
      location: null
    }
  }

  setViewport = (viewport) => {
    this.setState({viewport})
  }

  /**
   *
   * @param {any} location
   * @param {number} longitude
   * @param {number} latitude
   * @param {Point[]} boundingBox
   */
  onSearchChange = (
    location,
    longitude,
    latitude,
    boundingBox = null
  ) => {
    console.log(boundingBox)
    console.log(latitude)
    this.setState({location});

    // Most features have a bounding box but specific locations do not so give them the highest zoom possible
    if (boundingBox) {
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        this.state.viewport
      ).fitBounds([boundingBox[0].toArray(), boundingBox[1].toArray()], {
        padding: 20,
        offset: [0, -100]
      });

      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude,
          longitude,
          zoom,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
          transitionEasing: easeCubic
        }
      })

    } else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude,
          longitude,
          zoom: 18, // give highest zoom possible
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
          transitionEasing: easeCubic
        }
      })
    }
  };

  render() {
    return (
      <div>
        <ReactMapGL
          ref={this._map}
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.setViewport}
        >
          <HexRender viewport={this.state.viewport}></HexRender>
        </ReactMapGL>
        <Search location={this.state.location} onChange={this.onSearchChange} />
      </div>
    );
  }
}

export default Map;
