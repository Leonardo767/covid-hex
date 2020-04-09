import { polyfill } from "h3-js";
import * as countryInfo from "./data/map-settings-by-country.json";
// const countryInfo = require("./data/map-settings-by-country.json");

function filterWithinCountry(countrySelected) {
  // console.log(countryInfo);
  console.log(countrySelected);
  console.log(countryInfo["default"][countrySelected]["hexRenderBounds"]);
  var countryBounds =
    countryInfo["default"][countrySelected]["hexRenderBounds"];
  var hex_resolution = 2;
  if (countrySelected === "hawaii") {
    hex_resolution = 3;
  }
  // only large hexes (=2) are filtered to get a rough shape at the outer zoom
  const hexIDsWithinCounty = polyfill(countryBounds, hex_resolution);
  return hexIDsWithinCounty;
}

export default filterWithinCountry;
