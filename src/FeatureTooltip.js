import ol from 'openlayers'
import $ from 'jquery'

import { cssClasses } from './globals'

import '../less/tooltip.less'
import {html2Text} from './utilities'

/**
 * @typedef {object} FeatureTooltipOptions
 * @property {string} [className='g4u-featuretooltip']
 * @property {number[]} [offset=[0,0]]
 * @property {ol.OverlayPositioning} [positioning='center-center']
 * @property {string[]} [popupModifier=[]]
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
     * @type {string[]}
     * @private
     */
    this.defaultPopupModifiers_ = options.popupModifier || []

    /**
     * @type {?ol.Feature}
     * @private
     */
    this.feature_ = null

    this.$element_.parent().addClass(this.className_ + '-container')
  }

  static canDisplay (feature) {
    return !feature.get('disabled') && (feature.get('name') ||
      (feature.get('features') && feature.get('features').length === 1))
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

      let interaction = map.getDefaultInteractions('pointermove')[0]
      interaction.on('select', e => {
        let selected = e.selected.filter(FeatureTooltip.canDisplay)
        if (selected.length) {
          let feature = selected[0]
          if (feature.get('features')) {
            feature = feature.get('features')[0]
          }
          this.setFeature(feature, e.mapBrowserEvent.coordinate)
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
   * @param {ol.Coordinate} coordinate
   * @param {string[]} [optPopupModifiers=[]]
   */
  setFeature (feature, coordinate = null, optPopupModifiers = []) {
    if (feature) {
      let currentPopupModifiers = [ ...this.defaultPopupModifiers_, ...optPopupModifiers ]
      this.getMap().get('popupModifiers').apply({
        name: feature.get('name'),
        description: feature.get('description')
      }, currentPopupModifiers)
        .then(result => {
          this.$element_.html(html2Text(result.name))
          this.$element_.removeClass(cssClasses.hidden)
        })
      if (!coordinate) {
        let geometry = feature.getGeometry()
        coordinate = ol.extent.getCenter(geometry.getExtent())
      }
      this.overlay_.setPosition(coordinate)
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
