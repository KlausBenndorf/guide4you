import ol from 'openlayers'
import $ from 'jquery'

import { cssClasses, keyCodes } from './globals'

/**
 * @typedef {object} APIOptions
 * @property {StyleLike} [drawStyle='#drawStyle']
 */

export class API extends ol.Object {
  /**
   * @param {G4UMap} map
   * @param {object} options
   */
  constructor (map, options = {}) {
    super()

    /**
     * @type {boolean}
     * @private
     */
    this.featureManipulationActive_ = false

    /**
     * @type {StyleLike}
     * @private
     */
    this.drawStyle_ = options.drawStyle || '#drawStyle'

    /**
     * @type {ol.format.WKT}
     * @private
     */
    this.wktParser_ = new ol.format.WKT()

    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map

    /**
     * @type {?ol.interaction.Interaction}
     * @private
     */
    this.featureManipulationInteraction_ = null

    this.map_.once('ready', () => {
      this.layerConfigurator_ = this.map_.get('configurator').layerConfigurator_
    })

    $(this.map_.getViewport()).on('keydown', this.onKeyDown_.bind(this))
  }

  // //////////////  FEATURE MANIPULATION ////////////////

  endFeatureManipulationInternal_ () {
    if (this.featureManipulationInteraction_) {
      this.featureManipulationInteraction_.setActive(false)

      this.map_.removeInteraction(this.featureManipulationInteraction_)
    }

    $(this.map_.getViewport()).removeClass(cssClasses.crosshair)
    $(this.map_.getViewport()).removeClass(cssClasses.arrow)
    // and any other cursor changes

    this.featureManipulationActive_ = false

    this.dispatchEvent('endManipulation')
  }

  /**
   * cancel the current feature manipulation
   */
  cancelFeatureManipulation () {
    if (this.featureManipulationActive_) {
      this.endFeatureManipulationInternal_()
    }
  }

  /**
   * draw a feature
   * @param {object} [options={}]
   * @param {StyleLike} [options.style]
   * @param {string} [options.type='Point']
   * @returns {Promise<ol.Feature>}
   */
  drawFeature (options = {}) {
    if (this.featureManipulationActive_) {
      this.endFeatureManipulationInternal_()
    }

    this.featureManipulationActive_ = true

    return new Promise((resolve) => {
      let collection = new ol.Collection()

      let styleConf = (options.style || this.drawStyle_) || {}

      let style = this.map_.get('styling').getStyle(styleConf)

      this.map_.get('styling').styleCollection(collection, style)

      this.featureManipulationInteraction_ = new ol.interaction.Draw({
        features: collection,
        type: options.type || 'Point',
        style: style
      })

      this.map_.addSupersedingInteraction('singleClick doubleClick mouseMove', this.featureManipulationInteraction_)

      $(this.map_.getViewport()).addClass(cssClasses.crosshair)

      this.featureManipulationInteraction_.on('drawend', e => {
        resolve(e.feature)
        this.endFeatureManipulationInternal_()
      })
    })
  }

  onKeyDown_ (e) {
    if (this.featureManipulationActive_ && e.which === keyCodes.ESCAPE) {
      this.endFeatureManipulationInternal_()
    }
  }

  /**
   * Select a feature with a single click
   * @returns {Promise<ol.Feature>}
   */
  selectFeature () {
    if (this.featureManipulationActive_) {
      this.endFeatureManipulationInternal_(null)
    }

    this.featureManipulationActive_ = true

    return new Promise((resolve) => {
      this.featureManipulationInteraction_ = new ol.interaction.Select()

      this.map_.addSupersedingInteraction('singleClick', this.featureManipulationInteraction_)

      $(this.map_.getViewport()).addClass(cssClasses.arrow)

      this.featureManipulationInteraction_.getFeatures().on('add', /** ol.CollectionEvent */ e => {
        resolve(e.element)
        this.endFeatureManipulationInternal_()
      })
    })
  }

  /**
   * Modify a given Feature
   * @param {ol.Collection<ol.Feature>|ol.Feature[]|ol.Feature} feature
   * @param {Object} options
   * @param {StyleLike} [options.style]
   */
  modifyFeature (feature, options = {}) {
    let features

    if (feature instanceof ol.Collection) {
      features = feature
    } else if (feature instanceof Array) {
      features = new ol.Collection(feature)
    } else {
      features = new ol.Collection([feature])
    }

    if (this.featureManipulationActive_) {
      this.endFeatureManipulationInternal_(false)
    }

    this.featureManipulationActive_ = true

    options.features = features
    if (options.style) {
      options.style = this.map_.get('styling').getStyle(options.style)
    }

    this.featureManipulationInteraction_ = new ol.interaction.Modify(options)

    this.map_.addSupersedingInteraction('singleClick doubleClick mouseMove', this.featureManipulationInteraction_)

    $(this.map_.getViewport()).addClass(cssClasses.crosshair)
  }

  /**
   * This function creates a layer from the given layerOptions and adds it the map
   * @param {g4uLayerOptions} layerOptions
   * @returns {VectorLayer}
   */
  addFeatureLayer (layerOptions) {
    return this.layerConfigurator_.getFactory()
      .addLayer(this.map_.get('featureLayers'), layerOptions, 'featureLayer', true)
  }

  /**
   * This function creates a layer from the given layerOptions and adds it as a fixedFeatureLayer to the map
   * @param {g4uLayerOptions} layerOptions
   * @returns {VectorLayer}
   */
  addFixedFeatureLayer (layerOptions) {
    return this.layerConfigurator_.getFactory()
      .addLayer(this.map_.get('fixedFeatureLayers'), layerOptions, 'featureLayer', true)
  }

  /**
   * This function creates a base layer from the given layerOptions and adds it to the map
   * @param {g4uLayerOptions} layerOptions
   * @returns {ol.layer.Base}
   */
  addBaseLayer (layerOptions) {
    return this.layerConfigurator_.getFactory()
      .addLayer(this.map_.get('baseLayers'), layerOptions, 'baseLayer', true)
  }

  /**
   * This function creates a layer from the given layerOptions, adds it as a VectorLayere and returns a promise which
   * is resolved as soon as the layer is loaded fully.
   * @param {g4uLayerOptions} layerOptions
   * @returns {Promise.<VectorLayer>}
   */
  loadLayerFromServer (layerOptions) {
    layerOptions = layerOptions || {}
    layerOptions.visible = true
    layerOptions.source = layerOptions.source || {}

    let promise = new Promise((resolve, reject) => {
      let layer = this.addFeatureLayer(layerOptions)
      let source = layer.getSource()
      let loadEndHandler = () => {
        source.un('vectorloadend', loadErrorHandler)
        resolve(layer)
      }
      let loadErrorHandler = () => {
        source.un('vectorloaderror', loadEndHandler)
        reject('vector load error')
      }
      source.once('vectorloadend', loadEndHandler)
      source.once('vectorloaderror', loadErrorHandler)
    })

    return promise
  }

  /**
   * Creates a Feature from the given config
   * @param {FeatureConfig} config
   * @returns {ol.Feature}
   */
  createFeature (config) {
    return this.layerConfigurator_.getFactory().createFeature(config)
  }

  /**
   * Removes a layer from the map
   * @param {ol.layer.Base} layer
   */
  removeLayer (layer) {
    this.map_.getLayerGroup().removeLayer(layer)
  }
}
