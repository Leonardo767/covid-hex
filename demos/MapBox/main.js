var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v10",
  center: [0, 0],
  zoom: 1
});

map.on("load", function() {
  map.addLayer({
    id: "terrain-data",
    type: "line",
    source: {
      type: "vector",
      url: "mapbox://mapbox.mapbox-terrain-v2"
    },
    "source-layer": "contour"
  });
});
