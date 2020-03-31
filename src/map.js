import React, { useState } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { hex_4, hex_6, hex_layer } from "./layers";
import Search from "./components/Search";

function Map(props) {
  // const {} = props;
  const [viewport, setViewport] = useState({
    latitude: 33.9137,
    longitude: -98.4934,
    width: "100vw",
    height: "100vh",
    zoom: 7
  });

  const changeViewport = (lat, long) => {
    setViewport(viewport => [{
      ...viewport,
      latitude: lat,
      longitude: long
    }])
  }

  return (
    <div>
      {/*<ReactMapGL
        {...viewport}
        // specify API token and controller for ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={setViewport}
      >
        <Source id="h3-hexes" type="geojson" data={hex_6}>
          <Layer {...hex_layer} />
        </Source>
        <Source id="h3-hexes" type="geojson" data={hex_4}>
          <Layer {...hex_layer} />
        </Source>
      </ReactMapGL>*/}
      <Search />
    </div>
  );
}

export default Map;
