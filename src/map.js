import React, { useState, createRef } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  WebMercatorViewport,
} from "react-map-gl";
import { easeCubic } from "d3-ease";
import Search from "./components/Search";
import HexRender from "./layers";
import { Point } from "./api/mapbox"; // eslint-disable-line
import * as countryInfo from "./data/map-settings-by-country.json";

class Map extends React.Component {
  // const {} = props;
  constructor(props) {
    super(props);
    this._map = createRef();
    this.state = {
      viewport: {
        latitude:
          countryInfo["default"][this.props.countrySelected]["centerLat"],
        longitude:
          countryInfo["default"][this.props.countrySelected]["centerLon"],
        width: "100vw",
        height: "100vh",
        zoom: countryInfo["default"][this.props.countrySelected]["centerZoom"],
      },
      location: null,
    };
  }

  setViewport = (viewport) => {
    const mapBounds =
      countryInfo["default"][this.props.countrySelected]["bounds"];
    const minLat = mapBounds[0][0];
    const maxLat = mapBounds[1][0];
    const minLon = mapBounds[0][1];
    const maxLon = mapBounds[1][1];
    if (viewport.longitude < minLon) {
      viewport.longitude = minLon;
    } else if (viewport.longitude > maxLon) {
      viewport.longitude = maxLon;
    }
    if (viewport.latitude < minLat) {
      viewport.latitude = minLat;
    } else if (viewport.latitude > maxLat) {
      viewport.latitude = maxLat;
    }
    this.setState({ viewport });
  };

  /**
   *
   * @param {any} location
   * @param {number} longitude
   * @param {number} latitude
   * @param {Point[]} boundingBox
   */
  onSearchChange = (location, longitude, latitude, boundingBox = null) => {
    console.log(boundingBox);
    console.log(latitude);
    this.setState({ location });

    // Most features have a bounding box but specific locations do not so give them the highest zoom possible
    if (boundingBox) {
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        this.state.viewport
      ).fitBounds([boundingBox[0].toArray(), boundingBox[1].toArray()], {
        padding: 20,
        offset: [0, -100],
      });

      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude,
          longitude,
          zoom,
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
          transitionEasing: easeCubic,
        },
      });
    } else {
      this.setState({
        viewport: {
          ...this.state.viewport,
          latitude,
          longitude,
          zoom: 18, // give highest zoom possible
          transitionDuration: 5000,
          transitionInterpolator: new FlyToInterpolator(),
          transitionEasing: easeCubic,
        },
      });
    }
  };

  render() {
    // console.log(this.props.countrySelected);
    return (
      <div>
        <ReactMapGL
          ref={this._map}
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.setViewport}
        >
          <HexRender
            viewport={this.state.viewport}
            countrySelected={this.props.countrySelected}
          ></HexRender>
        </ReactMapGL>
        <Search location={this.state.location} onChange={this.onSearchChange} />
      </div>
    );
  }
}

export default Map;
