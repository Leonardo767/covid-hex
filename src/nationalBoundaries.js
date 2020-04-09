import { polyfill } from "h3-js";
import * as countryInfo from "./data/map-settings-by-country.json";

function renderAllLargeHexes(countrySelected) {
  const countryChosen = countryInfo["default"][countrySelected];
  const hexRegions = Object.values(countryChosen["hexRenderBounds"]);
  const hex_resolution = 2;
  // only large hexes (=2) are filtered to get a rough shape at the outer zoom
  var hexIDsWithinCounty = [];
  hexRegions.forEach(
    (region) =>
      (hexIDsWithinCounty = hexIDsWithinCounty.concat(
        polyfill(region, hex_resolution)
      ))
  );
  return hexIDsWithinCounty;
}

export default renderAllLargeHexes;
