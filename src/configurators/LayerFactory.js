import $ from 'jquery'

import Collection from 'ol/Collection'
import { containsExtent } from 'ol/extent'
import { all } from 'ol/loadingstrategy'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import OSM from 'ol/source/OSM'
import Stamen from 'ol/source/Stamen'
import BingMaps from 'ol/source/BingMaps'
import { createXYZ } from 'ol/tilegrid'
import TileGrid from 'ol/tilegrid/TileGrid'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import WKT from 'ol/format/WKT'
import Feature from 'ol/Feature'
import WMTSCapabilities from 'ol/format/WMTSCapabilities'
import WMTS from 'ol/source/WMTS'
import ImageCanvas from 'ol/source/ImageCanvas'

import { BaseLayerImage, ImageLayer } from '../layers/ImageLayer'
import { EmptyBaseLayer } from '../layers/EmptyBaseLayer'
import { BaseTileLayer } from '../layers/BaseTileLayer'
import { TileLayer } from '../layers/TileLayer'
import { GroupLayer } from '../layers/GroupLayer'
import { VectorLayer } from '../layers/VectorLayer'
import { ArcGISRESTFeatureSource } from '../sources/ArcGISRESTFeatureSource'
import { SourceServerVector } from '../sources/SourceServerVector'
import { QueryVectorSource } from '../sources/QueryVectorSource'
import { copyDeep, mergeDeep, take } from '../utilitiesObject'
import { asObject, checkFor } from '../utilities'

import { Debug } from '../Debug'
import { ImageWMSSource, TileWMSSource } from '../sources/ImageWMSSource'
import { BaseSilentGroupLayer, SilentGroupLayer } from '../layers/SilentGroupLayer'
import { URL } from '../URLHelper'
import { QueryImageWMSSource, QueryTileWMSSource } from '../sources/QueryWMSSource'
import { ClusterSource } from '../sources/ClusterSource'
import { WMTSSource } from '../sources/WMTSSource'

/**
 * @enum {string}
 */
export const SuperType = {
  BASELAYER: 'baseLayer',
  FEATURELAYER: 'featureLayer',
  QUERYLAYER: 'queryLayer'
}

/**
 * @enum {string}
 */
export const LayerType = {
  CATEGORY: 'Category',
  SILENTGROUP: 'SilentGroup',
  GEOJSON: 'GeoJSON',
  KML: 'KML',
  WMS: 'WMS',
  TILEWMS: 'TileWMS',
  WMTS: 'WMTS',
  OSM: 'OSM',
  STAMEN: 'Stamen',
  INTERN: 'Intern',
  EMPTY: 'Empty',
  XYZ: 'XYZ',
  BING: 'Bing',
  ARCGISRESTFEATURE: 'ArcGISRESTFeature'
}

/**
 * @typedef {SilentGroupLayerConfig|CategoryLayerConfig|EmptyLayerConfig|XYZLayerConfig|OSMLayerConfig
 *    |StamenLayerConfig|BingLayerConfig|WMTSLayerConfig|WMSLayerConfig|TileWMSLayerConfig|GeoJSONLayerConfig
 *    |KMLLayerConfig|InternalLayerConfig} AnyLayerConfig
 */

/**
 * Common config for all layers.
 * @public
 * @typedef {Object} g4uLayerOptions
 * @property {LayerType} type The layer type.
 * @property {string|number} id unique in the whole config
 * @property {string} [title]
 * @property {Boolean} [available] if set to false, the layer will not appear on the map or the layer selector.
 * @property {Boolean} [availableMobile] overwrites available in mobile mode
 * @property {Boolean} [visible=false] If set to `true` the layer will be visible on startup.
 * @property {Boolean} [alwaysVisible] overwrites visible, available and mobileAvailable
 * @property {StyleLike} [style]
 */

/**
 * The silent group can display a group of layers which appears as a single in the layer selector.
 * @typedef {g4uLayerOptions} SilentGroupLayerConfig
 * @property {"SilentGroup"} type
 * @property {AnyLayerConfig[]} layers
 */

/**
 * The category contains other layer(s) and will appear as a category in the layer selector.
 * @typedef {g4uLayerOptions} CategoryLayerConfig
 * @property {"Category"} type
 * @property {AnyLayerConfig[]} layers
 */

/**
 * The empty layer will show nothing (in case of a base layer a white background).
 * @typedef {g4uLayerOptions} EmptyLayerConfig
 * @property {"Empty"} type
 */

/**
 * A XYZ Layer (See http://openlayers.org/en/latest/apidoc/ol.source.XYZ.html).
 * @typedef {g4uLayerOptions} XYZLayerConfig
 * @property {"XYZ"} type
 * @property {SourceConfig} source
 */

/**
 * An OSM Layer (See http://openlayers.org/en/latest/apidoc/ol.source.OSM.html).
 * @typedef {g4uLayerOptions} OSMLayerConfig
 * @property {"OSM"} type
 * @property {SourceConfig} source
 */

/**
 * A stamen Layer (See http://openlayers.org/en/latest/apidoc/ol.source.Stamen.html).
 * @typedef {g4uLayerOptions} StamenLayerConfig
 * @property {"Stamen"} type
 * @property {SourceConfig} source
 */

/**
 * A bing maps Layer (See http://openlayers.org/en/latest/apidoc/ol.source.BingMaps.html).
 * @typedef {g4uLayerOptions} BingLayerConfig
 * @property {"Bing"} type
 * @property {SourceConfig} source
 */

/**
 * A WMTS Layer. Check the {WMTSSSourceConfig}.
 * @typedef {g4uLayerOptions} WMTSLayerConfig
 * @property {"WMTS"} type
 * @property {WMTSSSourceConfig} source
 */

/**
 * A WMS Layer. Check the {{WMSSSourceConfig}}.
 * @typedef {g4uLayerOptions} WMSLayerConfig
 * @property {"WMS"} type
 * @property {WMSSSourceConfig} source
 * @property {LayerButton[]} [buttons] If this is set, the layer appears as multiple buttons in th layerselector
 * @property {boolean} [categoryButton=false] If the buttons option is set, this options specifies if the buttons should
 *    appear as a category or not.
 */

/**
 * A WMS Layer which is called like a tiled layer. Good for performance. Check the {{WMSSSourceConfig}}.
 * @typedef {g4uLayerOptions} TileWMSLayerConfig
 * @property {"TileWMS"} type
 * @property {WMSSSourceConfig} source
 * @property {LayerButton[]} [buttons] If this is set, the layer appears as multiple buttons in th layerselector
 * @property {boolean} [categoryButton=false] If the buttons option is set, this options specifies if the buttons should
 *    appear as a category or not.
 */

/**
 * A GeoJSON Layer.
 * @typedef {g4uLayerOptions} GeoJSONLayerConfig
 * @property {"GeoJSON"} type
 * @property {VectorSourceConfig} source
 * @property {StyleLike} [style]
 */

/**
 * A KML Layer.
 * @typedef {g4uLayerOptions} KMLLayerConfig
 * @property {"KML"} type
 * @property {VectorSourceConfig} source
 * @property {StyleLike} [style]
 */

/**
 * A layer whichs contents are completly defined in the config file.
 * @typedef {g4uLayerOptions} InternalLayerConfig
 * @property {"Intern"} type
 * @property {InternalSourceConfig} source
 * @property {StyleLike} [style]
 */

/**
 * A source config.
 * @typedef {Object} SourceConfig
 * @property {Localizable} [attribution]
 * @property {URLLike} url
 */

/**
 * A vector source config.
 * @typedef {SourceConfig} VectorSourceConfig
 * @property {string} [loadingStrategy='ALL'] Either 'BBOX', 'ALL' or 'TILE'
 *    If BBOX or TILE the given url has to contain the parameters {minx}, {miny}, {maxx}, {maxy}.
 * @property {number} [bboxRatio=1] If set the bbox loading strategy will increase the load extent by this factor
 * @property {module:ol/proj~ProjectionLike} [urlProjection] coordinates will be inserted into the url in this format.
 *    defaults to the sourceProjection
 * @property {boolean} [localised=false] if set to true the loader will send accept-language headers.
 */

/**
 * A wmts source config. The config must contain a `config` object that must contain a `layer`` parameter. For other
 *    parameters see: http://openlayers.org/en/latest/apidoc/ol.source.WMTS.html#.optionsFromCapabilities. All other
 *    needed Parameters will be obtained automatically.
 * @typedef {SourceConfig} WMTSSSourceConfig
 * @property {object} config
 */

/**
 * An internal source whose features are defined directly in the config file.
 * @typedef {SourceConfig} InternalSourceConfig
 * @property {FeatureConfig[]} features
 */

/**
 * @typedef {Object} FeatureConfig
 * @property {string|number} id
 * @property {StyleLike} [style]
 * @property {string} [geometryWKT]
 * @property {ol.geom.Geometry} [geometry]
 */

/**
 * This class constructs a layer according to the given {{LayerOptions}}
 */
export class LayerFactory {
  /**
   * @param {G4UMap} map
   */
  constructor (map) {
    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map
  }

  /**
   * @param {ol.ProjectionLike} mapConfigProjection
   */
  setMapConfigProjection (mapConfigProjection) {
    this.mapProjection = mapConfigProjection
  }

  /**
   * @returns {ol.ProjectionLike}
   */
  getMapProjection () {
    return this.mapProjection
  }

  /**
   * Adds multiple layers according to their configs to the given layerGroup
   * @param {LayerGroup} layerGroup
   * @param {g4uLayerOptions[]} configs
   * @param {string} superType
   * @param {Boolean} skipIdCheck
   * @returns {ol.Layer.Base[]}
   */
  addLayers (layerGroup, configs, superType, skipIdCheck) {
    return configs.map(config => this.addLayer(layerGroup, config, superType, skipIdCheck))
  }

  /**
   * Adds a layer defined by a given config to a given layerGroup
   * @param {LayerGroup} layerGroup
   * @param {g4uLayerOptions} options
   * @param {string} superType
   * @param {Boolean} skipIdCheck
   * @returns {ol.layer.Base}
   */
  addLayer (layerGroup, options, superType, skipIdCheck) {
    let layer
    /**
     * @type {g4uLayerOptions}
     */
    let optionsCopy = copyDeep(options)

    if (skipIdCheck || this.configureLayerIsIdOk_(optionsCopy.id)) {
      // loading strategy

      if (!optionsCopy.type) {
        throw new Error(`Layer needs a type. Layer id: ${optionsCopy.id}. Layer title: ${optionsCopy.title}.`)
      }

      // availability
      this.configureLayerAvailability_(optionsCopy)

      // the title/name of the layer
      this.configureLayerTitle_(optionsCopy)

      if (superType === SuperType.BASELAYER) {
        optionsCopy.groupLayer = this.map_.get('layerConfigurator').getBaseLayerGroup()
      }

      if (optionsCopy.source) {
        this.configureLayerSourceAttribution_(optionsCopy.source)
      }

      // visibility
      this.configureLayerVisibility_(optionsCopy)

      layer = this.createLayer(optionsCopy.type, optionsCopy, superType, skipIdCheck)

      let forEachLayer = layer => {
        layerGroup.getLayers().push(layer)
      }

      if (layer instanceof Collection) {
        layer.forEach(forEachLayer)
      } else {
        forEachLayer(layer)
      }
    }

    return layer
  }

  /**
   * @param {string} type
   * @param {string} superType
   */
  superTypeNotSupported (type, superType) {
    throw new Error(`${type} is not configured for superType '${superType}'`)
  }

  /**
   * Creates a layer or a collection of layers from the config
   * @param {string} layerType
   * @param {g4uLayerOptions} optionsCopy
   * @param {string} superType
   * @param {Boolean} skipIdCheck
   * @returns {ol.layer.Layer|ol.Collection.<ol.layer.Layer>}
   */
  createLayer (layerType, optionsCopy, superType, skipIdCheck) {
    if (superType === SuperType.QUERYLAYER) {
      if (!optionsCopy.hasOwnProperty('apiKey')) {
        Debug.error('Each query layer needs to have an apiKey.')
      }
      optionsCopy.source.projection = this.mapProjection
    }

    if (optionsCopy.source) {
      optionsCopy.source.localiser = this.map_.get('localiser')
    }

    let layer
    let layerConfigs
    let clusterOptions
    let localised = false
    if (optionsCopy.source) {
      optionsCopy.source.localiser = this.map_.get('localiser')
      localised = optionsCopy.source.localised
    }

    let style = take(optionsCopy, 'style')

    switch (layerType) {
      case LayerType.SILENTGROUP:

        layerConfigs = take(optionsCopy, 'layers')

        if (superType === SuperType.BASELAYER) {
          layer = new BaseSilentGroupLayer(optionsCopy)
        } else {
          layer = new SilentGroupLayer(optionsCopy)
        }

        this.addLayers(layer, layerConfigs, superType, true)

        layer.getLayers().forEach(childLayer => {
          childLayer.setVisible(true)
        })
        break
      case LayerType.CATEGORY:
        layerConfigs = take(optionsCopy, 'layers')

        layer = new GroupLayer(optionsCopy)

        this.addLayers(layer, layerConfigs, superType, skipIdCheck)

        // availability & parent ref
        let childrenAvailable = false
        layer.getLayers().forEach(childLayer => {
          childLayer.set('category', layer)
          childrenAvailable = childrenAvailable || childLayer.get('available')
        })

        let childrenCount = layer.getLayers().getLength()

        if (childrenAvailable !== false) {
          if ((layer.get('available') !== false) && (childrenCount > 0)) {
            // category is shown

            if (childrenAvailable === true) {
              layer.set('available', true)
            }

            layer.setVisible(true)

            if (superType === SuperType.BASELAYER) {
              layer.set('activateChildren', false)
            }

            return layer
          } else if (childrenAvailable === true) {
            // only children are shown
            return layer.getLayers()
          }
          // else neither are shown
        }
        break
      case LayerType.EMPTY:
        if (superType === SuperType.BASELAYER) {
          layer = new EmptyBaseLayer(optionsCopy)
        } else {
          optionsCopy.source = new VectorSource()
          layer = new VectorLayer(optionsCopy)
        }
        break
      case LayerType.XYZ:
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_).finalize()
        optionsCopy.source = new XYZ(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }
        break
      case LayerType.OSM:
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_).finalize()
        optionsCopy.source = new OSM(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }
        break
      case LayerType.STAMEN:
        optionsCopy.source = new Stamen(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }
        break
      case LayerType.BING:
        optionsCopy.source = new BingMaps(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }
        break
      case LayerType.WMS:
        if (optionsCopy.categoryButtons) {
          optionsCopy.source.params.LAYERS = []
        }

        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_) // not finalized

        if (superType === SuperType.BASELAYER) {
          optionsCopy.source = new ImageWMSSource(optionsCopy.source)
          layer = new BaseLayerImage(optionsCopy)
        } else if (superType === SuperType.QUERYLAYER) {
          optionsCopy.visible = false
          optionsCopy.source = new QueryImageWMSSource(optionsCopy.source)
          layer = new ImageLayer(optionsCopy)
        } else {
          optionsCopy.source = new ImageWMSSource(optionsCopy.source)
          layer = new ImageLayer(optionsCopy)
        }

        if (layer.getSource().hasFeatureInfo()) {
          this.map_.asSoonAs('ready:ui', true, () => {
            if (this.map_.get('showWMSFeatureInfo')) {
              this.map_.get('showWMSFeatureInfo').addLayer(layer)
            }
          })
        }

        break
      case LayerType.TILEWMS:
        if (optionsCopy.source.tileSize) {
          optionsCopy.source.tileGrid = createXYZ({ tileSize: optionsCopy.source.tileSize })
          delete optionsCopy.source.tileSize
        } else if (optionsCopy.source.tileGrid) {
          optionsCopy.source.tileGrid = new TileGrid(optionsCopy.source.tileGrid)
        }

        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_) // not finalized

        if (superType === SuperType.BASELAYER) {
          optionsCopy.source = new TileWMSSource(optionsCopy.source)
          layer = new BaseTileLayer(optionsCopy)
        } else if (superType === SuperType.QUERYLAYER) {
          optionsCopy.visible = false
          optionsCopy.source = new QueryTileWMSSource(optionsCopy.source)
          layer = new TileLayer(optionsCopy)
        } else {
          optionsCopy.source = new TileWMSSource(optionsCopy.source)
          layer = new TileLayer(optionsCopy)
        }

        if (layer.getSource().hasFeatureInfo()) {
          this.map_.asSoonAs('ready:ui', true, () => {
            if (this.map_.get('showWMSFeatureInfo')) {
              this.map_.get('showWMSFeatureInfo').addLayer(layer)
            }
          })
        }

        break
      case LayerType.WMTS:
        let sourceOptions = take(optionsCopy, 'source')

        if (!sourceOptions.autoConfig) {
          if (!sourceOptions.tileGrid) {
            throw new Error('You have to provide either a tileGrid or use autoConfig for WMTS Source')
          }

          sourceOptions.tileGrid = new WMTSTileGrid(sourceOptions.tileGrid)

          sourceOptions.url = URL.extractFromConfig(sourceOptions, 'url', undefined, this.map_) // not finalized

          optionsCopy.source = new WMTSSource(sourceOptions)
        }
        // url gets extracted in setWMTSSourceFromCapabilities

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }

        if (sourceOptions.autoConfig) {
          this.setWMTSSourceFromCapabilities(layer, sourceOptions)
        }

        break
      case LayerType.GEOJSON:
        this.configureLayerSourceLoadingStrategy_(optionsCopy.source)
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_) // not finalized

        optionsCopy.source.defaultStyle = this.map_.get('styling').getStyle(style || '#defaultStyle')

        optionsCopy.source.type = 'GeoJSON'

        optionsCopy.source.bboxProjection = optionsCopy.source.bboxProjection || this.map_.get('interfaceProjection')

        optionsCopy.source.styling = this.map_.get('styling')

        clusterOptions = take(optionsCopy.source, 'cluster')

        if (superType === SuperType.QUERYLAYER) {
          optionsCopy.visible = false
          optionsCopy.source = new QueryVectorSource(optionsCopy.source)
        } else {
          optionsCopy.source = new SourceServerVector(optionsCopy.source)
        }

        if (clusterOptions) {
          clusterOptions = asObject(clusterOptions)
          optionsCopy.source = new ClusterSource(optionsCopy.source, clusterOptions)
        }
        layer = new VectorLayer(optionsCopy)
        break
      case LayerType.KML:
        this.configureLayerSourceLoadingStrategy_(optionsCopy.source)
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_) // not finalized

        optionsCopy.source.defaultStyle = this.map_.get('styling').getStyle(style || '#defaultStyle')

        optionsCopy.source.type = 'KML'

        optionsCopy.source.bboxProjection = optionsCopy.source.bboxProjection || this.map_.get('interfaceProjection')

        optionsCopy.source.styling = this.map_.get('styling')

        clusterOptions = take(optionsCopy.source, 'cluster')

        if (superType === SuperType.QUERYLAYER) {
          optionsCopy.visible = false
          optionsCopy.source = new QueryVectorSource(optionsCopy.source)
        } else {
          optionsCopy.source = new SourceServerVector(optionsCopy.source)
        }

        if (clusterOptions) {
          optionsCopy.source = new ClusterSource(optionsCopy.source, asObject(clusterOptions))
        }
        layer = new VectorLayer(optionsCopy)
        break
      case LayerType.ARCGISRESTFEATURE:
        this.configureLayerSourceLoadingStrategy_(optionsCopy.source)
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_) // not finalized

        if (superType === SuperType.QUERYLAYER) {
          this.superTypeNotSupported(layerType, superType)
        } else {
          optionsCopy.source = new ArcGISRESTFeatureSource(optionsCopy.source)
        }

        layer = new VectorLayer(optionsCopy)
        break
      case LayerType.INTERN:

        if (optionsCopy.source.hasOwnProperty('features')) {
          for (let i = 0; i < optionsCopy.source.features.length; i++) {
            optionsCopy.source.features[i] = this.createFeature(optionsCopy.source.features[i])
          }
        }

        optionsCopy.source = new VectorSource(optionsCopy.source)

        if (superType === SuperType.QUERYLAYER) {
          this.superTypeNotSupported(layerType, superType)
        } else {
          layer = new VectorLayer(optionsCopy)
        }
        break
    }

    for (let module of this.map_.getModules()) {
      if (layer) {
        break
      }
      layer = module.createLayer(optionsCopy.type, optionsCopy, superType, skipIdCheck)
    }

    if (!layer) {
      throw new Error(`layer with type '${optionsCopy.type}' could not be created.`)
    }

    // styling
    if (layer.setStyle) {
      layer.setStyle(this.map_.get('styling').getStyle(style))
      this.map_.get('styling').manageLayer(layer)
    }

    // if layer is a baselayer, check for mapProjection
    if (superType === SuperType.BASELAYER && optionsCopy.source) {
      if (layer.getSource().getProjection()) {
        if (!this.mapProjection) {
          this.mapProjection = layer.getSource().getProjection()
        } else if (this.mapProjection && this.mapProjection !== layer.getSource().getProjection()) {
          Debug.warn('The baseLayers are not in mapProjection or a baseLayers has a different projection than' +
             ' another! This might cause reprojection issues.')
        }
      }
    } else if (superType === SuperType.QUERYLAYER) {
      this.map_.get('urlApi').addApiLayer(layer, optionsCopy.apiKey)
    }

    // if layer is being localised, refresh on language change
    if (localised) {
      this.map_.get('localiser').on('change:language', () => layer.getSource().refresh())
    }

    return layer
  }

  /**
   * A function that checks if a layer id is setted and not a duplicate of another.
   * Throws an error if this is the case.
   * @param {string|number} id
   * @private
   */
  configureLayerIsIdOk_ (id) {
    /**
     * @type {string[]|number[]}
     */
    let layerIds = this.map_.get('layerIds')

    if (id === 0 || (id && (typeof id === 'string' || !isNaN(id)))) {
      for (let j = 0, jj = layerIds.length; j < jj; j++) {
        if (id === layerIds[j]) {
          Debug.error(`Each layer needs a unique id! Otherwise the layer won't be shown. Layer id: ${id}`)
          return false
        }
      }
      layerIds.push(id)
      this.map_.set('layerIds', layerIds)
      return true
    } else {
      Debug.error(`Each layer needs a unique id! Otherwise the layer won't be shown. Layer id: ${id}`)
      return false
    }
  }

  /**
   * @param {g4uLayerOptions} config
   * @returns {g4uLayerOptions}
   * @private
   */
  configureLayerAvailability_ (config) {
    // if available is set to false explicitely, the layer won't be available
    config.available = (config.available !== false)

    if (!config.alwaysVisible) {
      config.available = config.hasOwnProperty('availableMobile') ? config.availableMobile : config.available
      if (this.map_.get('ignoreLayerAvailability')) {
        config.available = true
      }
    }
    return config
  }

  /**
   * @param {SourceConfig} sourceConfig
   * @returns {SourceConfig}
   * @private
   */
  configureLayerSourceAttribution_ (sourceConfig) {
    if (checkFor(sourceConfig, 'attribution')) {
      sourceConfig.attributions = [this.map_.get('localiser').selectL10N(sourceConfig.attribution)]
    }
    return sourceConfig
  }

  /**
   * @param {SourceConfig} sourceConfig
   * @returns {SourceConfig}
   * @private
   */
  configureLayerSourceLoadingStrategy_ (sourceConfig) {
    const loadingStrategy = sourceConfig.hasOwnProperty('loadingStrategy')
      ? sourceConfig.loadingStrategy
      : this.map_.get('loadingStrategy')

    if (loadingStrategy === 'BBOX') {
      let bboxRatio = sourceConfig.bboxRatio || 1

      if (bboxRatio < 1) {
        throw new Error('The bboxRatio should not be smaller than 1')
      }

      let lastScaledExtent = [0, 0, 0, 0]

      sourceConfig.strategy = (extent) => {
        if (containsExtent(lastScaledExtent, extent)) {
          return [extent]
        } else {
          let deltaX = ((extent[2] - extent[0]) / 2) * (bboxRatio - 1)
          let deltaY = ((extent[3] - extent[1]) / 2) * (bboxRatio - 1)

          lastScaledExtent = [
            extent[0] - deltaX,
            extent[1] - deltaY,
            extent[2] + deltaX,
            extent[3] + deltaY
          ]

          return [lastScaledExtent]
        }
      }
    } else {
      sourceConfig.strategy = all
    }

    sourceConfig.loadingStrategyType = loadingStrategy

    return sourceConfig
  }

  /**
   * @param {g4uLayerOptions} config
   * @returns {g4uLayerOptions}
   * @private
   */
  configureLayerTitle_ (config) {
    if (!config.hasOwnProperty('title')) {
      config.title = 'No title given'
    } else {
      config.title = this.map_.get('localiser').selectL10N(config.title)
    }
    return config
  }

  /**
   * @param {g4uLayerOptions} config
   * @returns {g4uLayerOptions}
   * @private
   */
  configureLayerVisibility_ (config) {
    if (config.alwaysVisible === true) {
      config.visible = true
    } else {
      config.visible = (config.visible === true)
    }

    return config
  }

  /**
   * @param {FeatureConfig} featureConf
   * @returns {ol.Feature}
   */
  createFeature (featureConf) {
    /**
     * @type {FeatureConfig}
     */
    let featureConfCopy = copyDeep(featureConf)

    let id = take(featureConfCopy, 'id')

    let style = take(featureConfCopy, 'style')

    let format = new WKT()
    let wkt = take(featureConfCopy, 'geometryWKT') || take(featureConfCopy, 'geographyWKT')
    featureConfCopy.geometry = format.readGeometry(wkt)
      .transform(this.map_.get('interfaceProjection'), this.map_.get('mapProjection'))

    let feature = new Feature(featureConfCopy)

    if (style) {
      this.map_.get('styling').styleFeature(feature, style)
    }

    if (id) {
      feature.setId(id)
    }

    return feature
  }

  setWMTSSourceFromCapabilities (layer, sourceOptions) {
    const url = URL.extractFromConfig(sourceOptions, 'url', undefined, this.map_)
    const capUrl = url.clone().addParam('Service=WMTS').addParam('Request=GetCapabilities')
    $.ajax({
      url: capUrl.finalize(),
      dataType: 'text xml',
      crossDomain: true,
      success: data => {
        const wmtsCap = (new WMTSCapabilities()).read(data)
        const capOptions = WMTS.optionsFromCapabilities(wmtsCap, take(sourceOptions, 'config'))
        if (capOptions === null) {
          Debug.error(`wmts layer not found or not set for layer with id "${layer.get('id')}"`)
        } else {
          capOptions.urls = capOptions.urls.map(newUrl => {
            const u = url.clone()
            u.url = newUrl
            return u.finalize()
          })
          sourceOptions = mergeDeep(sourceOptions, capOptions)
          layer.setSource(new WMTS(sourceOptions))
        }
      }
    })
    layer.setSource(new ImageCanvas({
      state: 'ready',
      canvasFunction: () => {} // not loading any canvas
    }))
  }
}
