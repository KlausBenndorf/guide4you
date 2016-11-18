import ol from 'openlayers'

import {BaseLayerImage, ImageLayer} from '../layers/ImageLayer'
import {EmptyBaseLayer} from '../layers/EmptyBaseLayer'
import {BaseLayerTile} from '../layers/BaseLayerTile'
import {LayerTile} from '../layers/LayerTile'
import {GroupLayer} from '../layers/GroupLayer'
import {VectorLayer} from '../layers/VectorLayer'
import {SourceServerVector} from '../sources/SourceServerVector'
import {QuerySource} from '../sources/QuerySource'
import { copyDeep, take } from '../utilitiesObject'
import { checkFor, addProxy } from '../utilities'

import {Debug} from '../Debug'

export const SuperType = {
  BASELAYER: 'baseLayer',
  FEATURELAYER: 'featureLayer',
  QUERYLAYER: 'queryLayer'
}

export const LayerType = {
  CATEGORY: 'Category',
  GEOJSON: 'GeoJSON',
  KML: 'KML',
  WMS: 'WMS',
  OSM: 'OSM',
  INTERN: 'Intern',
  EMPTY: 'Empty'
}

/**
 * A config describing a layer
 * @public
 * @typedef {Object} g4uLayerOptions
 * @property {string} type the LayerType
 * @property {string|number} id unique in the whole config
 * @property {string} title
 * @property {SourceConfig} source
 * @property {Boolean} available
 * @property {Boolean} availableMobile overwrites available in mobile mode
 * @property {Boolean} visible
 * @property {Boolean} alwaysVisible overwrites visible, available and mobileAvailable
 */

/**
 * A config describing the source of a layer
 * @public
 * @typedef {Object} SourceConfig
 * @property {Localizable} [attribution]
 * @property {ol.Attribution[]} [attributions] will be setted automatically.
 * @property {null} [crossOrigin] will be setted automatically.
 * @property {string} loadingStrategy
 * @property {string} url
 * @property {Boolean} [useProxy=false]
 * @property {string} [proxy]
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

        if (optionsCopy.type !== LayerType.INTERN) {
          // the url of the source
          this.configureLayerSourceURL_(optionsCopy.source)
        }
      }

      // visibility
      this.configureLayerVisibility_(optionsCopy)

      let style = take(optionsCopy, 'style')

      layer = this.createLayer(optionsCopy.type, optionsCopy, superType, skipIdCheck)

      let forEachLayer = layer => {
        layerGroup.getLayers().push(layer)
      }

      if (layer instanceof ol.Collection) {
        layer.forEach(forEachLayer)
      } else {
        // styling
        if (style) {
          this.map_.get('styling').styleLayer(layer, style)
        }

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

    let layer

    switch (layerType) {
      case LayerType.CATEGORY:

        let layerConfigs = take(optionsCopy, 'layers')

        layer = new GroupLayer(optionsCopy)

        this.addLayers(layer, layerConfigs, superType, skipIdCheck)

        // availability
        let childrenAvailable = false
        layer.getLayers().forEach(layer => {
          childrenAvailable = childrenAvailable || layer.get('available')
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
          this.superTypeNotSupported(layerType, superType)
        }
        break
      case LayerType.OSM:

        optionsCopy.source = new ol.source.OSM(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseLayerTile(optionsCopy)
        } else {
          layer = new LayerTile(optionsCopy)
        }
        break
      case LayerType.WMS:

        optionsCopy.source = new ol.source.ImageWMS(optionsCopy.source)

        if (superType === SuperType.BASELAYER) {
          layer = new BaseLayerImage(optionsCopy)
        } else if (superType === SuperType.QUERYLAYER) {
          this.superTypeNotSupported(layerType, superType)
        } else {
          layer = new ImageLayer(optionsCopy)
        }
        break
      case LayerType.GEOJSON:
        this.configureLayerSourceLoadingStrategy_(optionsCopy.source)
        optionsCopy.source.defaultStyle = this.map_.get('styling').getStyle(optionsCopy.style || '#defaultStyle')

        optionsCopy.source.type = 'GeoJSON'

        if (superType === SuperType.QUERYLAYER) {
          optionsCopy.source = new QuerySource(optionsCopy.source)
        } else {
          optionsCopy.source = new SourceServerVector(optionsCopy.source)
        }
        layer = new VectorLayer(optionsCopy)
        break
      case LayerType.KML:

        this.configureLayerSourceLoadingStrategy_(optionsCopy.source)

        optionsCopy.source.defaultStyle = this.map_.get('styling').getStyle(optionsCopy.style || '#defaultStyle')

        optionsCopy.source.type = 'KML'

        if (superType === SuperType.QUERYLAYER) {
          optionsCopy.source = new QuerySource(optionsCopy.source)
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
          return new VectorLayer(optionsCopy)
        }
        break
    }

    let modules = this.map_.getModules()

    for (let i = 0, ii = modules.length; i < ii && (layer === undefined); i++) {
      layer = modules[i].createLayer(optionsCopy.type, optionsCopy, superType, skipIdCheck)
    }

    if (!layer) {
      throw new Error(`layer with type '${optionsCopy.type}' could not be created.`)
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
   * @param {SourceConfig} sourceConfig
   * @returns {SourceConfig}
   * @private
   */
  configureLayerSourceURL_ (sourceConfig) {
    sourceConfig.url = this.map_.get('localiser').selectL10N(sourceConfig.url)

    sourceConfig.crossOrigin = null // this strangely enables crossOrigin requests

    let useProxy = (sourceConfig.useProxy === true || (sourceConfig.useProxy === undefined && !!sourceConfig.proxy))

    if (useProxy) {
      sourceConfig.proxy = sourceConfig.proxy || this.map_.get('proxy')

      if (!sourceConfig.proxy) {
        throw new Error('No proxy configured. Either configure a local or global proxy if you want to use the option' +
          ' useProxy.')
      }

      sourceConfig.url = addProxy(sourceConfig.url, sourceConfig.proxy)
    }

    return sourceConfig
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
      feature.setId(featureConfCopy.id)
    }

    return feature
  }
}
