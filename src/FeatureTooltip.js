import ol from 'openlayers'
import $ from 'jquery'

import { cssClasses } from './globals'

import '../less/tooltip.less'

/**
 * @typedef {object} FeatureTooltipOptions
 * @property {string} [className='g4u-featuretooltip']
 * @property {number[]} [offset=[0,0]]
 * @property {ol.OverlayPositioning} [positioning='center-center']
 */

/**
 * Displays a tooltip if a feature with a name is hovered.
 */
export class FeatureTooltip {
  /**
   * @param {FeatureTooltipOptions} [options={}]
   */
  constructor (options = {}) {
    /**
     * @type {string}
     * @private
     */
    this.className_ = (options.hasOwnProperty('className')) ? options.className : 'g4u-featuretooltip'

    /**
     * @type {jQuery}
     * @private
     */
    this.$element_ = $('<span></span>').addClass(this.className_).addClass(cssClasses.hidden)

    /**
     * @type {ol.Overlay}
     * @private
     */
    this.overlay_ = new ol.Overlay({
      element: this.$element_.get(0),
      offset: (options.hasOwnProperty('offset')) ? options.offset : [0, 0],
      positioning: (options.hasOwnProperty('positioning')) ? options.positioning : 'center-center',
      stopEvent: false
    })

    /**
     * @type {?ol.Feature}
     * @private
     */
    this.feature_ = null

    this.$element_.parent().addClass(this.className_ + '-container')
  }

  static filter_ (feature) {
    return !feature.get('disabled') && feature.get('name')
  }

  /**
   * @param {G4UMap} map
   */
  setMap (map) {
    if (this.getMap()) {
      this.getMap().removeOverlay(this.overlay_)
    }

    if (map) {
      map.addOverlay(this.overlay_)

      let interaction = map.getDefaultInteractions('mouseMove')[0]
      interaction.on('select', e => {
        let selected = e.selected.filter(FeatureTooltip.filter_)
        if (selected.length) {
          this.setFeature(selected[0])
        } else {
          this.setFeature(null)
        }
      })

      /**
       * @type {?G4UMap}
       * @private
       */
      this.map_ = map
    }
  }

  /**
   * @returns {?ol.Feature}
   */
  getFeature () {
    return this.feature_
  }

  /**
   * @param {?ol.Feature} feature
   */
  setFeature (feature) {
    if (feature) {
      this.$element_.html(feature.get('name'))
      let geometry = feature.getGeometry()
      let coord = ol.extent.getCenter(geometry.getExtent())
      this.overlay_.setPosition(coord)
      this.$element_.removeClass(cssClasses.hidden)
    } else {
      this.$element_.addClass(cssClasses.hidden)
    }
    this.feature_ = feature
  }

  /**
   * @returns {G4UMap}
   */
  getMap () {
    return this.map_
  }
}
