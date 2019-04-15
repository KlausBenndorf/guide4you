import $ from 'jquery'
import Observable from 'ol/Observable'

import { containsExtent } from 'ol/extent'
import { all, tile } from 'ol/loadingstrategy'
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
import WMTS, { optionsFromCapabilities } from 'ol/source/WMTS'
import ImageCanvas from 'ol/source/ImageCanvas'

import { ImageLayer } from '../layers/ImageLayer'
import { EmptyImageLayer } from '../layers/EmptyImageLayer'
import { TileLayer } from '../layers/TileLayer'
import { VectorLayer } from '../layers/VectorLayer'
import { ArcGISRESTFeatureSource } from '../sources/ArcGISRESTFeatureSource'
import { SourceServerVector } from '../sources/SourceServerVector'
import { copyDeep, mergeDeep, take } from '../utilitiesObject'
import { asObject, checkFor } from '../utilities'

import { Debug } from '../Debug'
import { ImageWMSSource, TileWMSSource } from '../sources/ImageWMSSource'
import { SilentGroupLayer } from '../layers/SilentGroupLayer'
import { URL } from '../URLHelper'
import { ClusterSource } from '../sources/ClusterSource'
import { WMTSSource } from '../sources/WMTSSource'

/**
 * @enum {string} LayerType
 */
export const LayerType = {
  GROUP: 'Group',
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
 * @property {number} [tileSize=512] If set the tile loading strategy will use tiles of this size
 * This class constructs a layer according to the given {{LayerOptions}}
 */
export class LayerFactory extends Observable {
  /**
   * @param {G4UMap} map
   */
  constructor (map) {
    super()
    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map
  }

  /**
   * Creates a layer or a collection of layers from the config
   * @param {g4uLayerOptions} optionsCopy
   * @returns {ol.layer.Layer|ol.Collection.<ol.layer.Layer>}
   */
  createLayer (options) {
    let optionsCopy = copyDeep(options)

    if (!optionsCopy.type) {
      throw new Error(`Layer needs a type. Layer id: ${optionsCopy.id}. Layer title: ${optionsCopy.title}.`)
    }

    const layerType = optionsCopy.type

    // availability
    this.configureLayerAvailability_(optionsCopy)

    // the title/name of the layer
    this.configureLayerTitle_(optionsCopy)

    if (optionsCopy.source) {
      this.configureLayerSourceAttribution_(optionsCopy.source)
    }

    // visibility
    this.configureLayerVisibility_(optionsCopy)

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

        layer = new SilentGroupLayer(optionsCopy)

        for (const options of layerConfigs) {
          options.visible = true
          layer.getLayers().add(this.createLayer(options))
        }

        break
      // case LayerType.CATEGORY:
      //   layerConfigs = take(optionsCopy, 'layers')
      //
      //   layer = new GroupLayer(optionsCopy)
      //
      //   this.addLayers(layer, layerConfigs, superType, skipIdCheck)
      //
      //   // TODO: realize childrenAvailable
      //   // availability & parent ref
      //   let childrenAvailable = false
      //   layer.getLayers().forEach(childLayer => {
      //     childLayer.set('category', layer)
      //     childrenAvailable = childrenAvailable || childLayer.get('available')
      //   })
      //
      //   let childrenCount = layer.getLayers().getLength()
      //
      //   if (childrenAvailable !== false) {
      //     if ((layer.get('available') !== false) && (childrenCount > 0)) {
      //       // category is shown
      //
      //       if (childrenAvailable === true) {
      //         layer.set('available', true)
      //       }
      //
      //       layer.setVisible(true)
      //
      //       if (superType === SuperType.BASELAYER) {
      //         layer.set('activateChildren', false)
      //       }
      //
      //       return layer
      //     } else if (childrenAvailable === true) {
      //       // only children are shown
      //       return layer.getLayers()
      //     }
      //     // else neither are shown
      //   }
      //   break
      case LayerType.EMPTY:
        layer = new EmptyImageLayer(optionsCopy)
        break
      case LayerType.XYZ:
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_).finalize()
        optionsCopy.source = new XYZ(optionsCopy.source)

        layer = new TileLayer(optionsCopy)
        break
      case LayerType.OSM:
        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_).finalize()
        optionsCopy.source = new OSM(optionsCopy.source)

        layer = new TileLayer(optionsCopy)
        break
      case LayerType.STAMEN:
        optionsCopy.source = new Stamen(optionsCopy.source)

        layer = new TileLayer(optionsCopy)
        break
      case LayerType.BING:
        optionsCopy.source = new BingMaps(optionsCopy.source)

        layer = new TileLayer(optionsCopy)
        break
      case LayerType.WMS:
        if (optionsCopy.categoryButtons) {
          optionsCopy.source.params.LAYERS = []
        }

        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_) // not finalized

        optionsCopy.source = new ImageWMSSource(optionsCopy.source)
        layer = new ImageLayer(optionsCopy)

        this.map_.asSoonAs('ready:ui', true, () => {
          if (this.map_.get('showWMSFeatureInfo')) {
            this.map_.get('showWMSFeatureInfo').addLayer(layer)
          }
        })

        break
      case LayerType.TILEWMS:
        if (optionsCopy.source.tileSize) {
          optionsCopy.source.tileGrid = createXYZ({ tileSize: optionsCopy.source.tileSize })
          delete optionsCopy.source.tileSize
        } else if (optionsCopy.source.tileGrid) {
          optionsCopy.source.tileGrid = new TileGrid(optionsCopy.source.tileGrid)
        }

        optionsCopy.source.url = URL.extractFromConfig(optionsCopy.source, 'url', undefined, this.map_) // not finalized

        // // TODO: wms query layer
        // optionsCopy.visible = false
        // optionsCopy.source = new QueryTileWMSSource(optionsCopy.source)
        // layer = new TileLayer(optionsCopy)

        optionsCopy.source = new TileWMSSource(optionsCopy.source)
        layer = new TileLayer(optionsCopy)

        this.map_.asSoonAs('ready:ui', true, () => {
          if (this.map_.get('showWMSFeatureInfo')) {
            this.map_.get('showWMSFeatureInfo').addLayer(layer)
          }
        })

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

        layer = new TileLayer(optionsCopy)

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

        optionsCopy.source = new SourceServerVector(optionsCopy.source)

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

        optionsCopy.source = new SourceServerVector(optionsCopy.source)

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

        if (optionsCopy.source && optionsCopy.source.hasOwnProperty('features')) {
          for (let i = 0; i < optionsCopy.source.features.length; i++) {
            optionsCopy.source.features[i] = this.createFeature(optionsCopy.source.features[i])
          }
        }

        optionsCopy.source = new VectorSource(optionsCopy.source)

        layer = new VectorLayer(optionsCopy)
        break
    }

    for (let module of this.map_.getModules()) {
      if (layer) {
        break
      }
      layer = module.createLayer(optionsCopy)
    }

    if (!layer) {
      throw new Error(`layer with type '${optionsCopy.type}' could not be created.`)
    }

    // styling
    if (layer.setStyle) {
      layer.setStyle(this.map_.get('styling').getStyle(style))
      this.map_.get('styling').manageLayer(layer)
    }

    // if layer is being localised, refresh on language change
    if (localised) {
      this.map_.get('localiser').on('change:language', () => layer.getSource().refresh())
    }

    this.dispatchEvent({
      type: 'created:layer',
      layer: layer,
      options: options
    })

    return layer
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
    } else if (loadingStrategy === 'TILE') {
      sourceConfig.strategy = tile(createXYZ({
        tileSize: sourceConfig.tileSize || 512
      }))
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
        const capOptions = optionsFromCapabilities(wmtsCap, take(sourceOptions, 'config'))
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
