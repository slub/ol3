import Feature from '../../../../src/ol/Feature.js';
import Map from '../../../../src/ol/Map.js';
import View from '../../../../src/ol/View.js';
import Point from '../../../../src/ol/geom/Point.js';
import VectorLayer from '../../../../src/ol/layer/Vector.js';
import VectorSource from '../../../../src/ol/source/Vector.js';

const map = new Map({
  pixelRatio: 1,
  target: 'map',
  layers: [
    new VectorLayer({
      source: new VectorSource({
        features: [
          new Feature({
            geometry: new Point([0, 0]),
          }),
        ],
      }),
    }),
  ],
  view: new View({
    projection: 'EPSG:4326',
    center: [0, 0],
    resolution: 1,
    multiWorld: true,
  }),
});
map.getView().setCenter([10, 10]);

render();
