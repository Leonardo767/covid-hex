config = ({
    lng: -122.4,
    lat: 37.7923539,
    zoom: 11.5,
    fillOpacity: 0.6,
    colorScale: ['#ffffcc', '#78c679', '#006837']
  })

hexagons = {
    const centerHex = h3.geoToH3(config.lat, config.lng, 8);
    const kRing = h3.kRing(centerHex, 3);
    // Reduce hexagon list to a map with random values
    return kRing.reduce((res, hexagon) => ({...res, [hexagon]: Math.random()}), {});
  }

function renderHexes(map, hexagons) {
  // Transform the current hexagon map into a GeoJSON object
  const geojson = geojson2h3.h3SetToFeatureCollection(
    Object.keys(hexagons),
    hex => ({ value: hexagons[hex] })
  );

  const sourceId = "h3-hexes";
  const layerId = `${sourceId}-layer`;
  let source = map.getSource(sourceId);

  // Add the source and layer if we haven't created them yet
  if (!source) {
    map.addSource(sourceId, {
      type: "geojson",
      data: geojson
    });
    map.addLayer({
      id: layerId,
      source: sourceId,
      type: "fill",
      interactive: false,
      paint: {
        "fill-outline-color": "rgba(0,0,0,0)"
      }
    });
    source = map.getSource(sourceId);
  }

  // Update the geojson data
  source.setData(geojson);

  // Update the layer paint properties, using the current config values
  map.setPaintProperty(layerId, "fill-color", {
    property: "value",
    stops: [
      [0, config.colorScale[0]],
      [0.5, config.colorScale[1]],
      [1, config.colorScale[2]]
    ]
  });

  map.setPaintProperty(layerId, "fill-opacity", config.fillOpacity);
}
