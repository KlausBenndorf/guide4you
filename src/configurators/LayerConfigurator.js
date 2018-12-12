import { get as getProj } from 'ol/proj'
import { GroupLayer } from '../layers/GroupLayer'
import { copyDeep } from '../utilitiesObject'
import { checkFor } from '../utilities'
import { Debug } from '../Debug'
import { LayerFactory } from './LayerFactory'
import { Attributions } from '../Attributions'
import { LayerSelector } from '../controls/LayerSelector'

/**
 * @typedef {Object} LayerConfig
 * @property {AnyLayerConfig[]} baseLayers
 * @property {AnyLayerConfig[]} featureLayers
 * @property {AnyLayerConfig[]} fixedFeatureLayers
 * @property {AnyLayerConfig[]} queryLayers
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
      this.onResolutionChange()
      this.map_.getView().on('change:resolution', () => this.onResolutionChange())
    })
  }

  onResolutionChange () {
    const zoom = this.map_.getView().getZoom()

    const layerIsViewable = layer => {
      if (layer.get('minZoom') && zoom < layer.get('minZoom')) {
        return false
      } else if (layer.get('maxZoom') && zoom > layer.get('maxZoom')) {
        return false
      } else {
        return true
      }
    }

    let activateNext = false
    this.map_.get('baseLayers').recursiveForEach(layer => {
      if (!(layer instanceof GroupLayer)) {
        if (layerIsViewable(layer)) {
          layer.set('disabled', false)
          if (activateNext) {
            layer.setVisible(true)
            activateNext = false
          }
        } else {
          layer.set('disabled', true)
          if (layer.getVisible()) {
            activateNext = true
          }
        }
      }
    })

    if (activateNext) {
      this.map_.get('baseLayers').recursiveForEach(layer => {
        if (!(layer instanceof GroupLayer)) {
          if (layerIsViewable(layer)) {
            if (activateNext) {
              layer.setVisible(true)
              activateNext = false
            }
          }
        }
      })
    }

    const forFeatureLayers = layer => {
      if (!(layer instanceof GroupLayer)) {
        if (layerIsViewable(layer)) {
          layer.set('disabled', false)
        } else {
          layer.set('disabled', true)
          if (layer.getVisible()) {
            layer.setVisible(false)
          }
        }
      }
    }

    this.map_.get('featureLayers').recursiveForEach(forFeatureLayers)
    if (this.map_.get('fixedFeatureLayers')) {
      this.map_.get('fixedFeatureLayers').recursiveForEach(forFeatureLayers)
    }
    if (this.map_.get('queryLayers')) {
      this.map_.get('queryLayers').recursiveForEach(forFeatureLayers)
    }

    for (let layerSelector of this.map_.getControlsByType(LayerSelector)) {
      layerSelector.updateDisabledButtons()
    }
  }

  /**
   * configures the layers according to the layerConfig stored in the 'layerConfig' property stored in the map. If the
   * config changes this method is called automatically.
   * @public
   */
  configureLayers () {
    this.map_.set('ready:layers', false)

    if (!(this.map_.getLayerGroup() instanceof GroupLayer)) {
      this.map_.setLayerGroup(new GroupLayer())
    }

    let layers = this.map_.getLayerGroup()
    layers.getLayers().clear()

    /**
     * @type {LayerConfig}
     */
    let layerConfigCopy = copyDeep(this.map_.get('layerConfig'))

    /**
     * @type {MapConfig}
     */
    let mapConfig = this.map_.get('mapConfig')

    this.map_.set('layerIds', []) // in layerIds all ids are stored to check if one is double.

    this.layerFactory_.setMapConfigProjection(
      mapConfig.hasOwnProperty('mapProjection') ? getProj(mapConfig.mapProjection) : null
    )

    this.map_.set('loadingStrategy',
      mapConfig.hasOwnProperty('loadingStrategy') ? mapConfig.loadingStrategy : 'ALL'
    )

    this.map_.set('ignoreLayerAvailability',
      mapConfig.hasOwnProperty('ignoreLayerAvailability') ? mapConfig.ignoreLayerAvailability : false
    )

    // //////////////////////////////////////////////////////////////////////////////////////////
    //                                      Baselayers                                        //
    // //////////////////////////////////////////////////////////////////////////////////////////

    // baseLayers before the view, because they determine the projection of the view.

    /**
     * @type {GroupLayer}
     * @private
     */
    this.baseLayerGroup_ = this.map_.get('baseLayers') || new GroupLayer()

    this.baseLayerGroup_.getLayers().clear()

    if ((layerConfigCopy.hasOwnProperty('baseLayers')) && (layerConfigCopy.baseLayers instanceof Array)) {
      Debug.tryOrThrow(() => {
        this.layerFactory_.addLayers(this.baseLayerGroup_, layerConfigCopy.baseLayers, 'baseLayer')
      })

      if (this.baseLayerGroup_.getLayers().getLength() === 0) {
        if (layerConfigCopy.baseLayers.length !== 0) {
          let confCp = copyDeep(layerConfigCopy.baseLayers[0])
          confCp.alwaysVisible = true
          this.layerFactory_.addLayers(this.baseLayerGroup_, confCp, 'baseLayer', true)
        } else {
          Debug.warn('There is no baselayer available!')
        }
      }

      let visibleBaseLayer

      this.baseLayerGroup_.recursiveForEach(function (layer) {
        if (!(layer instanceof GroupLayer)) {
          visibleBaseLayer = visibleBaseLayer || layer.getVisible()
        }
      })

      if (!visibleBaseLayer && this.baseLayerGroup_.getLayers().getLength()) {
        let setFirstVisible = layer => {
          if (layer instanceof GroupLayer) {
            setFirstVisible(layer.getLayersArray()[0])
          } else {
            layer.setVisible(true)
          }
        }

        setFirstVisible(this.baseLayerGroup_)
      }

      if (!this.map_.get('baseLayers')) {
        this.baseLayerGroup_.getLayers().on('remove', e => {
          if (this.baseLayerGroup_.getLayers().getLength() > 0) {
            if (e.element.getVisible()) {
              this.baseLayerGroup_.getLayers().item(0).setVisible(true)
            }
          }
        })
      }

      this.map_.set('baseLayers', this.baseLayerGroup_)
      layers.getLayers().push(this.baseLayerGroup_)
    } else {
      Debug.warn('The mapConfig option \'baseLayers\' is not set or not an Array!')
    }

    // if no baselayer had a given projection, choose 'EPSG:3857'
    this.map_.set('mapProjection', this.layerFactory_.getMapProjection() || getProj('EPSG:3857'))

    // //////////////////////////////////////////////////////////////////////////////////////////
    //                                    FeatureLayers                                       //
    // //////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @type {GroupLayer}
     */
    let featureLayers = this.map_.get('featureLayers') || new GroupLayer()

    featureLayers.getLayers().clear()

    this.layerFactory_.addLayers(featureLayers, layerConfigCopy.featureLayers || [], 'featureLayer')

    this.map_.set('featureLayers', featureLayers)
    layers.getLayers().push(featureLayers)

    // //////////////////////////////////////////////////////////////////////////////////////////
    //                                 FixedFeatureLayers                                     //
    // //////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @type {GroupLayer}
     */
    let fixedFeatureLayers = this.map_.get('fixedFeatureLayers') || new GroupLayer()

    fixedFeatureLayers.getLayers().clear()

    if (checkFor(layerConfigCopy, 'fixedFeatureLayers')) {
      this.layerFactory_.addLayers(fixedFeatureLayers, layerConfigCopy.fixedFeatureLayers, 'featureLayer')

      this.map_.set('fixedFeatureLayers', fixedFeatureLayers)
      layers.getLayers().push(fixedFeatureLayers)
    }

    // //////////////////////////////////////////////////////////////////////////////////////////
    //                                      QueryLayer                                        //
    // //////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @type {GroupLayer}
     */
    let queryLayers = this.map_.get('queryLayers') || new GroupLayer()

    queryLayers.getLayers().clear()

    if ((layerConfigCopy.hasOwnProperty('queryLayers')) && (layerConfigCopy.queryLayers instanceof Array)) {
      this.layerFactory_.addLayers(queryLayers, layerConfigCopy.queryLayers, 'queryLayer', true)

      this.map_.set('queryLayers', queryLayers)
      layers.getLayers().push(queryLayers)
    }

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
   * @returns {GroupLayer}
   */
  getBaseLayerGroup () {
    return this.baseLayerGroup_
  }

  /**
   * @returns {LayerFactory}
   */
  getFactory () {
    return this.layerFactory_
  }
}
