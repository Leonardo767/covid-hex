import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import { hexagons } from "./data/hex-SanFran.js";
import "./App.css";
// global.document = {};
// import logo from "./logo.svg";
// import * as parkData from "./data/skateboard-park.json";

function App() {
  const [viewport, setViewport] = useState({
    latitude: 32,
    longitude: -97,
    width: "100vw",
    height: "100vh",
    zoom: 7
  });

  // console.log(hexagons);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      ></ReactMapGL>
    </div>
  );
}

export default App;
