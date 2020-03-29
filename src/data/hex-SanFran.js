import { geoToH3 } from "h3-js";
import { kRing } from "h3-js";

export function hexagons() {
  const centerHex = geoToH3(-122.4, 37.7923539, 8);
  const kRing_res = kRing(centerHex, 3);
  // Reduce hexagon list to a map with random values
  return kRing_res.reduce(
    (res, hexagon) => ({ ...res, [hexagon]: Math.random() }),
    {}
  );
}
