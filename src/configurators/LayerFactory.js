import ol from 'openlayers'
import $ from 'jquery'

import {BaseLayerImage, ImageLayer} from '../layers/ImageLayer'
import {EmptyBaseLayer} from '../layers/EmptyBaseLayer'
import {BaseTileLayer} from '../layers/BaseTileLayer'
import {TileLayer} from '../layers/TileLayer'
import {GroupLayer} from '../layers/GroupLayer'
import {VectorLayer} from '../layers/VectorLayer'
import {SourceServerVector} from '../sources/SourceServerVector'
import {QueryVectorSource} from '../sources/QueryVectorSource'
import { copyDeep, mergeDeep, take } from '../utilitiesObject'
import { checkFor } from '../utilities'

import {Debug} from '../Debug'
import {ImageWMSSource, TileWMSSource} from '../sources/ImageWMSSource'
import { BaseSilentGroupLayer, SilentGroupLayer } from '../layers/SilentGroupLayer'
import { URL } from '../URLHelper'
import { QueryImageWMSSource, QueryTileWMSSource } from '../sources/QueryWMSSource'

export const SuperType = {
  BASELAYER: 'baseLayer',
  FEATURELAYER: 'featureLayer',
  QUERYLAYER: 'queryLayer'
}

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
  BING: 'Bing'
}

/**
 * A config describing a layer
 * @public
 * @typedef {Object} g4uLayerOptions
 * @property {string} type the LayerType
 * @property {string|number} id unique in the whole config
 * @property {string} title
 * @property {SourceConfig|ol.source.Source} source
 * @property {Boolean} available
 * @property {Boolean} availableMobile overwrites available in mobile mode
 * @property {Boolean} visible
 * @property {Boolean} alwaysVisible overwrites visible, available and mobileAvailable
 * @property {StyleLike} [style]
 */

/**
 * A config describing the source of a layer
 * @public
 * @typedef {Object} SourceConfig
 * @property {Localizable} [attribution]
 * @property {boolean} [localised=false]
 * @property {ol.Attribution[]} [attributions] will be setted automatically.
 * @property {null} [crossOrigin] will be setted automatically.
 * @property {string} loadingStrategy
 * @property {URLLike} url
 */

/**
 * @typedef {Object} FeatureConfig
 * @public
 * @property {string|number} id
 * @property {StyleLike} style
 * @property {string} geometryWKT
 * @property {ol.geom.Geometry} geometry
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

      if (layer instanceof ol.Collection) {
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
          optionsCopy.source = new ol.source.Vector()
          layer = new VectorLayer(optionsCopy)
        }
        break
      case LayerType.XYZ:
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_).finalize()
        optionsCopy.source = new ol.source.XYZ(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }
        break
      case LayerType.OSM:
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_).finalize()
        optionsCopy.source = new ol.source.OSM(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }
        break
      case LayerType.STAMEN:
        optionsCopy.source = new ol.source.Stamen(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }
        break
      case LayerType.BING:
        optionsCopy.source = new ol.source.BingMaps(optionsCopy.source)

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
          optionsCopy.source.tileGrid = ol.tilegrid.createXYZ({ tileSize: optionsCopy.source.tileSize })
          delete optionsCopy.source.tileSize
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

        if (superType === SuperType.BASELAYER) {
          layer = new BaseTileLayer(optionsCopy)
        } else {
          layer = new TileLayer(optionsCopy)
        }

        this.setWMTSSourceFromCapabilities(layer, sourceOptions)

        break
      case LayerType.GEOJSON:
        this.configureLayerSourceLoadingStrategy_(optionsCopy.source)
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_) // not finalized

        optionsCopy.source.defaultStyle = this.map_.get('styling').getStyle(style || '#defaultStyle')

        optionsCopy.source.type = 'GeoJSON'

        optionsCopy.source.bboxProjection = optionsCopy.source.bboxProjection || this.map_.get('interfaceProjection')

        optionsCopy.source.styling = this.map_.get('styling')

        if (superType === SuperType.QUERYLAYER) {
          optionsCopy.visible = false
          optionsCopy.source = new QueryVectorSource(optionsCopy.source)
        } else {
          optionsCopy.source = new SourceServerVector(optionsCopy.source)
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

        if (superType === SuperType.QUERYLAYER) {
          optionsCopy.visible = false
          optionsCopy.source = new QueryVectorSource(optionsCopy.source)
        } else {
          optionsCopy.source = new SourceServerVector(optionsCopy.source)
        }

        layer = new VectorLayer(optionsCopy)
        break
      case LayerType.INTERN:

        if (optionsCopy.source.hasOwnProperty('features')) {
          for (let i = 0; i < optionsCopy.source.features.length; i++) {
            optionsCopy.source.features[i] = this.createFeature(optionsCopy.source.features[i])
          }
        }

        optionsCopy.source = new ol.source.Vector(optionsCopy.source)

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
          throw new Error('The baseLayers are not in mapProjection or a baseLayers has a different projection than' +
            ' another! This is not supported.')
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
      sourceConfig.attributions = [
        new ol.Attribution({
          html: this.map_.get('localiser').selectL10N(sourceConfig.attribution)
        })
      ]
    }
    return sourceConfig
  }

  /**
   * @param {SourceConfig} sourceConfig
   * @returns {SourceConfig}
   * @private
   */
  configureLayerSourceLoadingStrategy_ (sourceConfig) {
    sourceConfig.loadingStrategy = sourceConfig.hasOwnProperty('loadingStrategy')
      ? sourceConfig.loadingStrategy
      : this.map_.get('loadingStrategy')
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

    let format = new ol.format.WKT()
    let wkt = take(featureConfCopy, 'geometryWKT') || take(featureConfCopy, 'geographyWKT')
    featureConfCopy.geometry = format.readGeometry(wkt)
      .transform(this.map_.get('interfaceProjection'), this.map_.get('mapProjection'))

    let feature = new ol.Feature(featureConfCopy)

    if (style) {
      this.map_.get('styling').styleFeature(feature, style)
    }

    if (id) {
      feature.setId(id)
    }

    return feature
  }

  setWMTSSourceFromCapabilities (layer, sourceOptions) {
    let url = URL.extractFromConfig(sourceOptions, 'url', undefined, this.map_)
    let capUrl = url.clone().addParam('Service=WMTS').addParam('Request=GetCapabilities')
    $.ajax({
      url: capUrl.finalize(),
      dataType: 'text xml',
      crossDomain: true,
      success: data => {
        let wmtsCap = (new ol.format.WMTSCapabilities()).read(data)
        let capOptions = ol.source.WMTS.optionsFromCapabilities(wmtsCap, take(sourceOptions, 'config'))
        sourceOptions.url = url.finalize()
        sourceOptions = mergeDeep(sourceOptions, capOptions)
        layer.setSource(new ol.source.WMTS(sourceOptions))
      }
    })
    layer.setSource(new ol.source.ImageCanvas({
      state: 'ready',
      canvasFunction: () => {} // not loading any canvas
    }))
  }
}
