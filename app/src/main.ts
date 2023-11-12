import { Map, View } from "ol";
import MVT from "ol/format/MVT";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorTileSource from "ol/source/VectorTile";
import { defaults as defaultControls } from "ol/control.js";
import VectorTileLayer from "ol/layer/VectorTile";
import TileDebug from "ol/source/TileDebug";
import Style, { StyleFunction } from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";

const baseLayer = new TileLayer({
  zIndex: 1,
  source: new OSM(),
});

const debugLayer = new TileLayer({
  zIndex: 200,
  source: new TileDebug(),
  visible: false,
});

const MAX_POP = 10000;
const staticStyle = new Style({
  fill: new Fill({}),
  stroke: new Stroke({
    color: "grey",
    width: 0.1,
  }),
  text: new Text({
    fill: new Fill({
      color: "#000",
    }),
  }),
});

const styleFunction: StyleFunction = (feature) => {
  const popn_total = feature.get("popn_total");
  const color = `hsl(0, 100%, ${(100 * (MAX_POP - popn_total)) / MAX_POP}%)`;
  staticStyle.getFill().setColor(color);
  staticStyle.getText().setText(`Population: ${popn_total.toString()}`);
  return staticStyle;
};

const vectorTileLayer = new VectorTileLayer({
  zIndex: 100,
  opacity: 0.8,
  source: new VectorTileSource({
    url: `http://localhost:3000/tiles/{z}/{x}/{y}.mvt`,
    format: new MVT(),
  }),
  style: styleFunction,
});

new Map({
  target: "map",
  controls: defaultControls(),
  layers: [baseLayer, vectorTileLayer, debugLayer],
  view: new View({
    center: [-8236020.171082405, 4975362.528079467],
    zoom: 10,
  }),
});

const showVectorLayer = document.getElementById(
  "showVectorLayer",
) as HTMLInputElement;

function update() {
  const visible = showVectorLayer.checked;
  vectorTileLayer.setVisible(visible);
}

showVectorLayer.addEventListener("input", update);
update();

const showTileDebug = document.getElementById(
  "showTileDebug",
) as HTMLInputElement;

function updateTileDebug() {
  const visible = showTileDebug.checked;
  debugLayer.setVisible(visible);
}

showTileDebug.addEventListener("input", updateTileDebug);
updateTileDebug();

const showBaseLayer = document.getElementById(
  "showBaseLayer",
) as HTMLInputElement;

function updateBaseLayer() {
  const visible = showBaseLayer.checked;
  baseLayer.setVisible(visible);
}

showBaseLayer.addEventListener("input", updateBaseLayer);
updateBaseLayer();
