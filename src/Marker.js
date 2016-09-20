import ol from 'openlayers'

import {VectorLayer} from 'guide4you/src/layers/VectorLayer'
import {filterText} from 'guide4you/src/xssprotection'

/**
 * @typedef {object} MarkerOptions
 * @property {StyleLike} [style='#defaultStyle']
 */

/**
 * Represents a single location with text on the map which can be setted via the url api.
 */
export class Marker {
  /**
   * @param {MarkerOptions} options
   */
  constructor (options = {}) {
    /**
     * @type {boolean}
     * @private
     */
    this.active_ = false

    /**
     * @type {StyleLike}
     * @private
     */
    this.style_ = options.style || '#defaultStyle'

    /**
     * @type {boolean}
     * @private
     */
    this.popupVisible_ = false
  }

  /**
   * @param {?G4UMap} map
   */
  setMap (map) {
    if (map) {
      /**
       * @type {?G4UMap}
       * @private
       */
      this.map_ = map // must happen in the beginning

      /**
       * @type {ol.Feature}
       * @private
       */
      this.feature_ = new ol.Feature()

      /**
       * @type {VectorLayer}
       * @private
       */
      this.vectorLayer_ = new VectorLayer({
        source: new ol.source.Vector({features: [this.feature_]}),
        visible: false
      })

      map.addLayer(this.vectorLayer_)

      map.get('styling').styleLayer(this.vectorLayer_, this.style_)

      if (map.get('featurePopup')) {
        let featurePopup = map.get('featurePopup')
        featurePopup.on('change:visible', () => {
          if (featurePopup.getFeature() === this.feature_) {
            this.popupVisible_ = featurePopup.get('visible')
          }
        })
      }
    } else {
      this.map_.removeLayer(this.vectorLayer_)

      this.map_ = map // must happen at the end
    }
  }

  /**
   * @returns {boolean}
   */
  getPopupVisible () {
    return this.popupVisible_
  }

  /**
   * @param {boolean} visible
   */
  setPopupVisible (visible) {
    this.popupVisible_ = visible

    let featurePopup = this.map_.get('featurePopup')

    if (featurePopup) {
      if (visible === true) {
        featurePopup.setFeature(this.feature_)
        featurePopup.setVisible(true)
      } else {
        featurePopup.setVisible(false)
      }

      featurePopup.update()
    }
  }

  /**
   * @param {boolean} active
   */
  setActive (active) {
    let oldValue = this.active_

    if (oldValue !== active) {
      this.active_ = active
      this.vectorLayer_.setVisible(active)

      if (!active) {
        this.setPopupVisible(false)
      }
    }
  }

  /**
   * @returns {boolean}
   */
  getActive () {
    return this.active_
  }

  /**
   * returns {ol.Coordinate|undefined}
   */
  getPosition () {
    let point = this.feature_.getGeometry()
    if (point) {
      return point.getCoordinates()
    }
  }

  /**
   * @param {ol.Coordinate} coords
   */
  setPosition (coords) {
    let point = new ol.geom.Point(coords)
    this.feature_.setGeometry(point) // triggers the repositioning of the marker
  }

  /**
   * Return description text of the marker.
   * @returns {string}
   */
  getText () {
    return this.feature_.get('description')
  }

  /**
   * Set description text of the marker.
   * @param {string} text
   */
  setText (text) {
    this.feature_.set('description', filterText(text))
  }
}
