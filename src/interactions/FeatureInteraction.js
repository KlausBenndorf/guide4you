import { sortBy } from 'lodash/collection'
import Point from 'ol/geom/Point'
import MultiPoint from 'ol/geom/MultiPoint'
import LineString from 'ol/geom/LineString'
import MultiLineString from 'ol/geom/MultiLineString'

import { MapEventInteraction } from './MapEventInteraction'

/**
 * @typedef {MapEventInteractionOptions} FeatureInteractionOptions
 * @property {number} [hitTolerance=0]
 */

export class FeatureInteraction extends MapEventInteraction {
  /**
   * @param {FeatureInteractionOptions} options
   */
  constructor (options = {}) {
    super(options)
    this.hitTolerance_ = options.hitTolerance || 0
  }

  handleMapEvent (e) {
    let interacted = []

    this.getMap().forEachFeatureAtPixel(e.pixel, (feature, layer) => {
      interacted.push({ feature, layer })
    }, { hitTolerance: this.hitTolerance_ })

    interacted = sortBy(interacted, ({ feature }) => {
      if ((feature.getGeometry() instanceof Point) || (feature.getGeometry() instanceof MultiPoint)) {
        return 1
      } else if ((feature.getGeometry() instanceof LineString) ||
        (feature.getGeometry() instanceof MultiLineString)) {
        return 2
      } else {
        return 3
      }
    })

    this.dispatchEvent({
      type: 'interaction',
      coordinate: e.coordinate,
      interacted
    })
  }

  triggerEmptyMapEvent () {
    this.dispatchEvent({
      type: 'interaction',
      interacted: []
    })
  }

  setHitTolerance (value) {
    this.hitTolerance_ = value
  }

  getHitTolerance () {
    return this.hitTolerance_
  }
}
