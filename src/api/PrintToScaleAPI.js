import Feature from 'ol/Feature'
import Translate from 'ol/interaction/Translate'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromExtent } from 'ol/geom/Polygon'

export class PrintToScaleAPI {
  constructor (mainAPI, map) {
    this.mainAPI_ = mainAPI
    this.map_ = map
  }

  showFrame (extent) {
    if (!this.frameSource_) {
      this.frameSource_ = new VectorSource({
        useSpatialIndex: false
      })
      this.map_.addLayer(new VectorLayer({
        source: this.frameSource_
      }))
      this.interaction_ = new Translate({
        features: this.frameSource_.getFeaturesCollection()
      })
      this.map_.addSupersedingInteraction('singleclick pointermove', this.interaction_)
    }

    this.interaction_.setActive(true)
    this.frameGeometry_ = fromExtent(extent)
    this.frameSource_.addFeature(new Feature(this.frameGeometry_))

    this.mainAPI_.once('cancelInteractions', () => {
      this.frameSource_.clear()
      this.interaction_.setActive(false)
    })
  }

  getFrame () {
    return this.frameGeometry_.getExtent()
  }

  hideFrame () {
    this.frameSource_.clear()
    this.interaction_.setActive(false)
  }
}
