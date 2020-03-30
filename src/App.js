import React, { useState, Component } from "react";
import { create_hexagons } from "./data/hex-SanFran.js";
import Map from "./map";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map />;
      </div>
    );
  }
}

export default App;
