import React from "react";
import ReactMapGL, {
  FlyToInterpolator,
  WebMercatorViewport,
} from "react-map-gl";
import { easeCubic } from "d3-ease";
import Search from "./components/Search";
import HexRender from "./layers";
import CountyRender from "./counties";
import { Point } from "./api/mapbox"; // eslint-disable-line
import * as countryInfo from "./data/map-settings-by-country.json";

class Map extends React.Component {
  // const {} = props;
  constructor(props) {
    super(props);
    // this._map = createRef();
    this.state = {
      viewport: {
        latitude: this.getCenterCoords()[0],
        longitude: this.getCenterCoords()[1],
        width: "100vw",
        height: "100vh",
        zoom: countryInfo["default"][this.props.countrySelected]["centerZoom"],
      },
      location: null,
    };
  }

  // componentDidMount() {
  //   this.setMapBoundaries();
  // }

  // setMapBoundaries = () => {
  //   const [[minLat, minLon], [maxLat, maxLon]] = countryInfo["default"][
  //     this.props.countrySelected
  //   ]["bounds"];
  //   const maxZoom =
  //     countryInfo["default"][this.props.countrySelected]["centerZoom"] + 0.1;
  //   // access map reference
  //   const myMap = this._map.getMap();
  //   myMap.setMaxBounds([
  //     [minLon, minLat],
  //     [maxLon, maxLat],
  //   ]);
  //   // myMap.setMaxZoom(maxZoom);
  // };

  getCenterCoords() {
    const [[minLat, minLon], [maxLat, maxLon]] = countryInfo["default"][
      this.props.countrySelected
    ]["bounds"];
    const centerLat = (minLat + maxLat) / 2;
    const centerLon = (minLon + maxLon) / 2;
    return [centerLat, centerLon];
  }

  setViewport = (viewport) => {
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
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={this.setViewport}
          dragRotate={false}
          touchRotate={false}
          // ref={(map) => (this._map = map)}
        >
          {/* <HexRender
            viewport={this.state.viewport}
            countrySelected={this.props.countrySelected}
          /> */}
          <CountyRender />
        </ReactMapGL>
        <Search location={this.state.location} onChange={this.onSearchChange} />
      </div>
    );
  }
}

export default Map;
