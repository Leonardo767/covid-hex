import React, { useState, useRef } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  WebMercatorViewport
} from "react-map-gl";
import { easeCubic } from "d3-ease";
import Search from "./components/Search";
import HexRender from "./layers";
import { Point } from "./api/mapbox"; // eslint-disable-line

function Map() {
  // const {} = props;
  const [viewport, setViewport] = useState({
    latitude: 33.9137,
    longitude: -98.4934,
    width: "100vw",
    height: "100vh",
    zoom: 7
  });
  const [location, setLocation] = useState(null);
  const _map = useRef(null);

  /**
   *
   * @param {any} location
   * @param {number} longitude
   * @param {number} latitude
   * @param {Point[]} boundingBox
   */
  const onSearchChange = (
    location,
    longitude,
    latitude,
    boundingBox = null
  ) => {
    setLocation(location);

    // Most features have a bounding box but specific locations do not so give them the highest zoom possible
    if (boundingBox) {
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        viewport
      ).fitBounds([boundingBox[0].toArray(), boundingBox[1].toArray()], {
        padding: 20,
        offset: [0, -100]
      });

      setViewport(viewport => ({
        ...viewport,
        latitude,
        longitude,
        zoom,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      }));
    } else {
      setViewport(viewport => ({
        ...viewport,
        latitude,
        longitude,
        zoom: 18, // give highest zoom possible
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic
      }));
    }
  };

  return (
    <div>
      <ReactMapGL
        ref={_map}
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
      >
        <HexRender viewport={viewport}></HexRender>
      </ReactMapGL>
      <Search location={location} onChange={onSearchChange} />
    </div>
  );
}

export default Map;
