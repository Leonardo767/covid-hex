import React, { createContext, useState, useContext } from "react";

const ViewportState = createContext();
const ViewportUpdate = createContext();
const MapContext = createContext();

// Yep! you can use multiple context in one Provider.
// pattern taken from:
// https://kentcdodds.com/blog/how-to-optimize-your-context-value
export function ViewportProvider({ children }) {
  const [viewport, setViewport] = useState({
    latitude: 33.9137,
    longitude: -98.4934,
    width: "100vw",
    height: "100vh",
    zoom: 3,
  });
  return (
    <ViewportState.Provider value={viewport}>
      <ViewportUpdate.Provider value={setViewport}>
        {children}
      </ViewportUpdate.Provider>
    </ViewportState.Provider>
  );
}

// expose the state
export function useViewport() {
  const context = useContext(ViewportState);
  if (context === undefined)
    throw Error("You forgot to wrap your app in <ViewportProvider />");
  return context;
}

// expose the updater
export function useSetViewport() {
  const context = useContext(ViewportUpdate);
  if (context === undefined)
    throw Error("You forgot to wrap your app in <ViewportProvider />");
  return context;
}

// handle state in your provider and pass it as the value
export function MapProvider(props) {
  const [map, setMap] = useState();
  return <MapContext.Provider value={[map, setMap]} {...props} />;
}

// expose a helper hook to easily grab the state anywhere in your app
// This is an excellent pattern to share state without redux - and be
// wary of how you can optimise it:
// https://kentcdodds.com/blog/how-to-optimize-your-context-value
export function useMap() {
  const context = useContext(MapContext);
  if (context === undefined)
    throw Error("You forgot to wrap your app with <MapProvider />");
  return context;
}
