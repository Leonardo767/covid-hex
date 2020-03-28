// window.onload = init;

// var tilegrid = ol.tilegrid.createXYZ({ tileSize: 512, maxZoom: 14 });
// var layer = new ol.layer.VectorTile({
//   source: new ol.source.VectorTile({
//     attributions:
//       '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
//       '© <a href="http://www.openstreetmap.org/copyright">' +
//       "OpenStreetMap contributors</a>",
//     format: new ol.format.MVT(),
//     tileGrid: tilegrid,
//     tilePixelRatio: 8,
//     url: "https://free-0.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=" + apiKey
//   })
// });

// var view = new ol.View({
//   center: [0, 0],
//   zoom: 2
// });

// var map = new ol.Map({
//   target: "js-map",
//   view: view
// });

// function init() {
//   const map = new ol.Map({
//     view: new ol.View({
//       center: [-10529456.646403033, 4738452.821628244],
//       zoom: 7
//     }),
//     layers: [
//       new ol.layer.Tile({
//         source: new ol.source.OSM()
//       })
//     ],
//     target: "js-map"
//   });

//   map.on("click", function(e) {
//     console.log(e.coordinate);
//   });
// }
