import $ from 'jquery'
import Collection from 'ol/Collection'
import Draw from 'ol/interaction/Draw'
import Modify from 'ol/interaction/Modify'
import { cssClasses } from '../globals'
import { FeatureInteraction } from '../interactions/FeatureInteraction'

export class FeatureAPI {
  constructor (mainAPI, map) {
    /**
     * @type {API}
     * @private
     */
    this.mainAPI_ = mainAPI

    /**
     * @type {G4UMap}
     * @private
     */
    this.map_ = map
  }

  /**
   * draw a feature
   * @param {object} [options={}]
   * @param {StyleLike} [options.style]
   * @param {string} [options.type='Point'] possible values are: 'Point', 'LineString', 'Polygon', 'MultiPoint',
   *  'MultiLineString', 'MultiPolygon' or 'Circle'
   * @returns {Promise<Feature>}
   */
  drawFeature (options = {}) {
    this.mainAPI_.cancelInteractions()

    const collection = new Collection()

    const style = this.map_.get('styling').getStyle(options.style || this.mainAPI_.getDrawStyle())
    this.map_.get('styling').manageFeatureCollection(collection)

    const interaction = new Draw({
      features: collection,
      type: options.type || 'Point',
      style: style
    })

    this.map_.addSupersedingInteraction('singleclick dblclick pointermove', interaction)

    $(this.map_.getViewport()).addClass(cssClasses.crosshair)

    return new Promise(resolve => {
      this.mainAPI_.once('cancelInteractions', () => {
        if (interaction.getActive()) {
          interaction.setActive(false)
          this.map_.removeInteraction(interaction)
          $(this.map_.getViewport()).removeClass(cssClasses.crosshair)
          resolve(null)
        }
      })
      interaction.on('drawend', e => {
        interaction.setActive(false)
        this.map_.removeInteraction(interaction)
        $(this.map_.getViewport()).removeClass(cssClasses.crosshair)
        resolve(e.feature)
      })
    })
  }

  /**
   * Select a feature with a single click
   * @returns {Promise<{feature: Feature, layer: VectorLayer}>}
   */
  selectFeature () {
    this.mainAPI_.cancelInteractions()

    const interaction = new FeatureInteraction({
      type: 'singleclick'
    })

    this.map_.addSupersedingInteraction('singleclick', interaction)

    $(this.map_.getViewport()).addClass(cssClasses.arrow)

    return new Promise(resolve => {
      this.mainAPI_.once('cancelInteractions', () => {
        if (interaction.getActive()) {
          interaction.setActive(false)
          this.map_.removeInteraction(interaction)
          $(this.map_.getViewport()).removeClass(cssClasses.arrow)
          resolve(null)
        }
      })
      interaction.on('interaction', e => {
        if (e.interacted.length) {
          interaction.setActive(false)
          this.map_.removeInteraction(interaction)
          $(this.map_.getViewport()).removeClass(cssClasses.arrow)
          resolve({
            feature: e.interacted[0].feature,
            layer: e.interacted[0].layer
          })
        }
      })
    })
  }

  /**
   * Modify a given Feature. The end function needs to be called to indicate that a modifying process is completed.
   * @param {ol.Feature[]|ol.Feature} features
   * @param {Object} options
   * @param {StyleLike} [options.style]
   */
  modifyFeature (features, options = {}) {
    this.mainAPI_.cancelInteractions()

    features = Array.isArray(features) ? features : [features]

    options.features = new Collection(features)

    if (options.style) {
      options.style = this.map_.get('styling').getStyle(options.style)
    }

    const interaction = new Modify(options)

    this.map_.addSupersedingInteraction('singleclick dblclick pointermove', interaction)

    $(this.map_.getViewport()).addClass(cssClasses.crosshair)

    this.mainAPI_.once('cancelInteractions', () => {
      $(this.map_.getViewport()).removeClass(cssClasses.crosshair)
      interaction.setActive(false)
      this.map_.removeInteraction(interaction)
    })
  }
}
