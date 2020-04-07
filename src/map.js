import React, { useState } from "react";
import ReactMapGL, { FlyToInterpolator } from "react-map-gl";
import HexRender from "./layers";
import { easeCubic } from "d3-ease";
// import Search from "./components/Search";

function Map(props) {
  // const {} = props;
  const [viewport, setViewport] = useState({
    latitude: 33.9137,
    longitude: -98.4934,
    width: "100vw",
    height: "100vh",
    zoom: 3,
  });

  const changeViewport = (lat, long) => {
    setViewport((viewport) => [
      {
        ...viewport,
        latitude: lat,
        longitude: long,
        zoom: 4,
        transitionDuration: 5000,
        transitionInterpolator: new FlyToInterpolator(),
        transitionEasing: easeCubic,
      },
    ]);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        // specify API token and controller for ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
      >
        <HexRender viewport={viewport}></HexRender>
      </ReactMapGL>
      {/* <Search /> */}
    </div>
  );
}

export default Map;
