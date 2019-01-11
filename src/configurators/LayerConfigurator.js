import { GroupLayer } from '../layers/GroupLayer'
import { LayerController } from '../layerSelector/LayerController'
import { copyDeep } from '../utilitiesObject'
import { Debug } from '../Debug'
import { LayerFactory } from './LayerFactory'
import { Attributions } from '../Attributions'

/**
 * @typedef {object} LayerConfig
 * @property {object.<string, ButtonConfig>} menus
 * @property {AnyLayerConfig[]} layers
 */

/**
 * @typedef {SilentGroupLayerConfig|CategoryLayerConfig|EmptyLayerConfig|XYZLayerConfig|OSMLayerConfig
 *    |StamenLayerConfig|BingLayerConfig|WMTSLayerConfig|WMSLayerConfig|TileWMSLayerConfig|GeoJSONLayerConfig
 *    |KMLLayerConfig|InternalLayerConfig} AnyLayerConfig
 */

/**
 * Common config for all layers.
 * @typedef {Object} g4uLayerOptions
 * @property {LayerType} type The layer type.
 * @property {string|number} id unique in the whole config
 * @property {Localizable} [title]
 * @property {Boolean} [available] if set to false, the layer will not appear on the map or the layer selector.
 * @property {Boolean} [availableMobile] overwrites available in mobile mode
 * @property {Boolean} [visible=false] If set to `true` the layer will be visible on startup.
 * @property {Boolean} [alwaysVisible] overwrites visible, available and mobileAvailable
 * @property {number} [minZoom] the minimal zoom from where the layer should be enabled
 * @property {number} [maxZoom] the minimal zoom from where the layer should be enabled
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
 * A WMTS Layer. Check the {{WMTSSSourceConfig}}.
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
 * @property {LayerButton[]} [buttons] If this is set, the layer appears as multiple buttons in the layerselector
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
 * @property {string} [loadingStrategy] "BBOX" or "ALL"
 * @property {number} [bboxRatio] only applies if loadingStrategy is BBOX. If bigger than 1 this much more will be
 *    loaded around a bbox.
 * @property {boolean} [localised=false] if set to true the loader will send accept-language headers.
 */

/**
 * A wmts source config. See https://openlayers.org/en/latest/apidoc/module-ol_source_WMTS-WMTS.html.
 * @typedef {SourceConfig} WMTSSSourceConfig
 * @property {object} config Needs to contain a `layer` parameter. For other parameters see:
 *    https://openlayers.org/en/latest/apidoc/module-ol_source_WMTS.html#.optionsFromCapabilities. required.
 * @property {boolean} [autoConfig=false] if autoConfig is set to true, guide4you makes a GetCapabilities-Request to
 *    automatically configure the WMTS. If not set a tileGrid has to be provided. See
 *    https://openlayers.org/en/latest/apidoc/module-ol_source_WMTS-WMTS.html.
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
 * @property {Geometry} [geometry]
 */

/**
 * This is part of the MapConfigurator class
 */
export class LayerConfigurator {
  /**
   * @param {G4UMap} map
   * @public
   */
  constructor (map) {
    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map
    this.map_.on('change:layerConfig', this.configureLayers.bind(this))

    /**
     * @type {LayerFactory}
     * @private
     */
    this.layerFactory_ = new LayerFactory(map)

    this.map_.on('ready', () => {
      this.layerController_.upadateDisabledLayers(this.map_.getView().getZoom())
      this.map_.getView().on('change:resolution', () => {
        this.layerController_.upadateDisabledLayers(this.map_.getView().getZoom())
      })
    })
  }

  /**
   * configures the layers according to the layerConfig stored in the 'layerConfig' property stored in the map. If the
   * config changes this method is called automatically.
   * @public
   */
  configureLayers () {
    this.map_.set('ready:layers', false)

    this.map_.getLayers().clear()

    /**
     * @type {LayerConfig}
     */
    let layerConfigCopy = copyDeep(this.map_.get('layerConfig'))

    /**
     * @type {MapConfig}
     */
    let mapConfig = this.map_.get('mapConfig')

    this.map_.set('layerIds', []) // in layerIds all ids are stored to check if one is double.

    this.map_.set('loadingStrategy',
      mapConfig.hasOwnProperty('loadingStrategy') ? mapConfig.loadingStrategy : 'ALL'
    )

    this.map_.set('ignoreLayerAvailability',
      mapConfig.hasOwnProperty('ignoreLayerAvailability') ? mapConfig.ignoreLayerAvailability : false
    )

    this.layerController_ = new LayerController(this.map_, layerConfigCopy)
    this.map_.set('layerController', this.layerController_)

    // //////////////////////////////////////////////////////////////////////////////////////////
    //                                      layers                                        //
    // //////////////////////////////////////////////////////////////////////////////////////////

    if (!(this.map_.getLayerGroup() instanceof GroupLayer)) {
      this.map_.setLayerGroup(new GroupLayer())
    }

    Debug.tryOrThrow(() => {
      for (const options of layerConfigCopy.layers) {
        /**
         * @type {g4uLayerOptions}
         */
        let optionsCopy = copyDeep(options)

        if (this.configureLayerIsIdOk_(optionsCopy.id)) {
          const layer = this.layerFactory_.createLayer(optionsCopy)
          this.map_.addLayer(layer)
          this.layerController_.registerLayer(optionsCopy.id, layer)
        }
      }
    })

    // //////////////////////////////////////////////////////////////////////////////////////// //
    //                                   All layers loaded                                      //
    // //////////////////////////////////////////////////////////////////////////////////////// //

    let loadingLayers = []
    let isLoadingDelayed = false
    let isLoadingPrecise = false

    let forEachLayer = (layer) => {
      if (layer.getLayers) {
        layer.getLayers().on('add', e => {
          forEachLayer(e.element)
        })
        layer.getLayers().forEach(forEachLayer)
      }
      if (layer.isLoading) {
        if (layer.isLoading()) {
          if (!isLoadingDelayed) {
            isLoadingDelayed = true
            this.map_.dispatchEvent('layersloadstart')
            this.map_.set('allLayersLoaded', false)
          }
          isLoadingPrecise = true
          loadingLayers.push(layer)
        }
      }
      layer.on('loadcountstart', () => {
        if (!isLoadingDelayed) {
          isLoadingDelayed = true
          this.map_.dispatchEvent('layersloadstart')
          this.map_.set('allLayersLoaded', false)
        }
        isLoadingPrecise = true
        loadingLayers.push(layer)
      })
      layer.on('loadcountend', () => {
        loadingLayers.splice(loadingLayers.indexOf(layer), 1)
        if (loadingLayers.length === 0) {
          isLoadingPrecise = false
          this.map_.afterPostrender(() => {
            if (!isLoadingPrecise) {
              this.map_.dispatchEvent('layersloadend')
              isLoadingDelayed = false
              this.map_.set('allLayersLoaded', true)
            }
          })
          this.map_.render()
        }
      })
    }

    forEachLayer(this.map_.getLayerGroup())

    this.map_.set('allLayersLoaded', false)

    let layerLoadStarted = false

    this.map_.once('layersloadstart', () => {
      layerLoadStarted = true
    })

    this.map_.once('postrender', () => {
      this.map_.once('postrender', () => {
        if (!layerLoadStarted) {
          this.map_.set('allLayersLoaded', true)
        }
      })
    })

    /** Attributions */

    let attributions = this.map_.get('attributions')
    if (!attributions) {
      attributions = new Attributions()
      this.map_.set('attributions', attributions)
    }
    attributions.setMap(this.map_)

    this.map_.set('ready:layers', true)
  }

  /**
   * @returns {LayerFactory}
   */
  getFactory () {
    return this.layerFactory_
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
}
