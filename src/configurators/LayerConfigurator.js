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
