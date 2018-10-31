import ol from 'ol'

import { MapEventInteraction } from './MapEventInteraction'
import { sortBy } from 'lodash/collection'

export class FeatureInteraction extends MapEventInteraction {
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
      if ((feature.getGeometry() instanceof ol.geom.Point) || (feature.getGeometry() instanceof ol.geom.MultiPoint)) {
        return 1
      } else if ((feature.getGeometry() instanceof ol.geom.LineString) ||
        (feature.getGeometry() instanceof ol.geom.MultiLineString)) {
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
