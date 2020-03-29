import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import logo from "./logo.svg";
import "./App.css";
import * as parkData from "./data/skateboard-park.json";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// 32, -97

export default function App() {
  const [viewport, setViewport] = useState({
    latitude: 32,
    longitude: -97,
    width: "100vw",
    height: "100vh",
    zoom: 7
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        {parkData.features.map(park => (
          <Marker
            key={park.properties.PARK_ID}
            latitude={park.geometry.coordinates[1]}
            longitude={park.geometry.coordinates[0]}
          >
            <div>SKATE</div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}
