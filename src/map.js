import React, { useState, useRef } from "react";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";
import { easeCubic } from "d3-ease";
import Search from "./components/Search";
import HexRender from "./layers";

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

  const onSearchChange = (location, longitude, latitude) => {
    setLocation(location);
    setViewport(viewport => [
      {
        ...viewport,
        latitude,
        longitude,
        zoom: 4,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      }
    ]);
  }

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
