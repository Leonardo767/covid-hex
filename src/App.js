import React, { useMemo } from "react";
import { ThemeProvider } from "@material-ui/core";
import Map from "./map";
import "./App.css";
import theme from "./theme";

function App(props) {
  const appTheme = useMemo(() => theme, []);

  return (
    <div className="App">
      <ThemeProvider theme={appTheme}>
        <Map />
      </ThemeProvider>
    </div>
  );
}

export default App;
