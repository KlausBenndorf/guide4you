//
// Hard coded default configuration for the client
//

// Element is a Keyword for the composition of config objects. Every attribute with 'Element' in its name
// isn't copied but used as a default case for elements of an array with the same name (-Element)

let defaults = {}

defaults.baselayer = {
  title: {
    'de': 'Standardtitel',
    'en': 'Default title'
  },
  type: 'OSM',
  source: {
    projection: 'EPSG:3857',
    url: {
      'de': '//{a-c}.tile.openstreetmap.de/tiles/osmde//{z}/{x}/{y}.png',
      'en': '//{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    attribution: {
      'de': 'Karte von <a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>, ' +
        'Lizenz: <a target="_blank" href="http://opendatacommons.org/licenses/odbl/">ODbL</a>',
      'en': 'Map from <a target="_blank" href="http://www.openstreetmap.org/">OpenStreetMap</a>, ' +
        'licence: <a target="_blank" href="http://opendatacommons.org/licenses/odbl/">ODbL</a>'
    }
  }
}

defaults.config = {
  target: '#g4u-map',
  interfaceProjection: 'EPSG:4326',
  view: {
    center: [7.086134, 50.714689], // always in interfaceProjection
    zoom: 18,
    minZoom: 0,
    maxZoom: 18
  },
  layers: {
    // baselayers
    baseLayers: [{
      // this default-case only comes into action if there is NO baselayer defined
      id: 0,
      title: defaults.baselayer.title,
      type: defaults.baselayer.type,
      source: {
        projection: defaults.baselayer.source.projection,
        url: defaults.baselayer.source.url,
        attribution: defaults.baselayer.source.attribution
      },
      visible: true
    }],
    featureLayers: [], // this default-case only comes into action if there is NO featurelayer defined
    featureLayersElement: {
      // these are the default values for the properties of every featurelayer defined
      title: 'Default title',
      type: 'KML',
      source: {
        loadingStrategy: 'ALL'
      }
    }
  },
  // (standard-) controls
  controls: {
  },
  move: {
    animationDuration: 2000,
    pixelPadding: 60,
    meterMinSize: 300
  },
  styleMap: {
    '#defaultStyle': {
      fill: {
        color: 'rgba(0,0,0,0)'
      },
      stroke: {
        color: 'rgba(255,255,255,1)',
        width: 2
      },
      circle: {
        radius: 5,
        fill: {
          color: 'rgba(0,0,0,0)'
        },
        stroke: {
          color: 'rgba(255,255,255,1)',
          width: 2
        }
      }
    }
  }
}

export default defaults
