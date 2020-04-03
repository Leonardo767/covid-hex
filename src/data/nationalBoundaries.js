import { polyfill } from "h3-js";

const unitedStates_rough = [
  [50, -126],
  [37, -125.5],
  [31, -118],
  [29, -106],
  [24, -97],
  [28, -94],
  [28, -84],
  [24, -83],
  [24, -79],
  [31, -78],
  [44, -66],
  [49, -68],
  [44, -81],
  [50.5, -85]
];

const defaultBounds = [
  [84, -176],
  [84, 176],
  [-84, 176],
  [-84, -176]
];

function filterWithinCountry(countryID) {
  var countryBounds = [[]];
  switch (countryID) {
    case "USA":
      countryBounds = unitedStates_rough;
      break;
    default:
      // effectively allows any hexIDs within reasonable worldly limits
      countryBounds = defaultBounds;
      break;
  }
  // only large hexes (=2) are filtered to get a rough shape at the outer zoom
  const hexIDsWithinCounty = polyfill(countryBounds, 2);
  return hexIDsWithinCounty;
}

export default filterWithinCountry;
