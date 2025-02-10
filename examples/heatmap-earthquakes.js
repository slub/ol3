import Map from '../src/ol/Map.js';
import View from '../src/ol/View.js';
import KML from '../src/ol/format/KML.js';
import HeatmapLayer from '../src/ol/layer/Heatmap.js';
import TileLayer from '../src/ol/layer/Tile.js';
import StadiaMaps from '../src/ol/source/StadiaMaps.js';
import VectorSource from '../src/ol/source/Vector.js';

const blur = document.getElementById('blur');
const radius = document.getElementById('radius');

const heatmap = new HeatmapLayer({
  source: new VectorSource({
    url: 'data/kml/2012_Earthquakes_Mag5.kml',
    format: new KML({
      extractStyles: false,
    }),
  }),
  blur: ['var', 'blur'],
  radius: ['var', 'radius'],
  variables: {
    blur: parseInt(blur.value, 10),
    radius: parseInt(radius.value, 10),
  },
  weight: function (feature) {
    // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
    // standards-violating <magnitude> tag in each Placemark.  We extract it from
    // the Placemark's name instead.
    const name = feature.get('name');
    const magnitude = parseFloat(name.substring(2));
    return magnitude - 5;
  },
});

const raster = new TileLayer({
  source: new StadiaMaps({
    layer: 'alidade_smooth_dark',
  }),
});

new Map({
  layers: [raster, heatmap],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

blur.addEventListener('input', function () {
  heatmap.updateStyleVariables({blur: parseInt(blur.value, 10)});
});

radius.addEventListener('input', function () {
  heatmap.updateStyleVariables({radius: parseInt(radius.value, 10)});
});
