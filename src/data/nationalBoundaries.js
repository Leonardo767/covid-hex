import { polyfill } from "h3-js";

const unitedStates = [
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
  [50.5, -85],
];

const alaska = [
  [55, -178],
  [61, -170],
  [70, -173],
  [73, -156],
  [70, -138],
  [61, -138],
  [61, -138],
  [57, -128],
  [54, -135],
  [58, -145],
  [51, -168],
];

// ref: https://gist.github.com/adamawolf/3614646
const hawaii = [
  [22.512557, -161.323242],
  [22, -157],
  [20, -154],
  [18, -156.09375],
  [22, -161.323242],
];

const defaultBounds = [
  [84, -176],
  [84, 176],
  [-84, 176],
  [-84, -176],
];

function filterWithinCountry(countryID) {
  var countryBounds = [[]];
  var hex_resolution = 2;
  switch (countryID) {
    case "USA":
      countryBounds = unitedStates;
      break;
    case "Alaska":
      countryBounds = alaska;
      break;
    case "Hawaii":
      countryBounds = hawaii;
      hex_resolution = 3;
      break;
    default:
      // effectively allows any hexIDs within reasonable worldly limits
      countryBounds = defaultBounds;
      break;
  }
  // only large hexes (=2) are filtered to get a rough shape at the outer zoom
  const hexIDsWithinCounty = polyfill(countryBounds, hex_resolution);
  return hexIDsWithinCounty;
}

export default filterWithinCountry;
