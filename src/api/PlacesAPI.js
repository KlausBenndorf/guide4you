import Feature from 'ol/Feature'
import WKT from 'ol/format/WKT'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

export class PlacesAPI {
  constructor (mainAPI, map) {
    this.mainAPI_ = mainAPI
    this.map_ = map
  }

  init () {
    if (!this.source_) {
      this.wktParser_ = new WKT()

      this.source_ = new VectorSource()
      this.map_.addLayer(new VectorLayer({
        source: this.source_
      }))

      this.nextId = 0
    }
  }

  addPlace (point, title, popuptext, options = {}) {
    this.init()
    let geom
    if (options.format !== 'array') {
      geom = this.wktParser_.readGeometry(point)
    } else {
      geom = new Point(point)
    }

    if (options.projection) {
      geom.transform(options.projection, this.map_.getView().getProjection())
    }

    const styling = this.map_.get('styling')
    const style = styling.getStyle(options.style || '#placesStyle')

    const id = this.nextId++

    const feature = new Feature(geom)
    feature.setId(id)
    feature.set('name', title)
    feature.set('description', popuptext)
    feature.setStyle(style)
    styling.manageFeature(feature)

    this.source_.addFeature(feature)

    return id
  }

  clear () {
    this.source_.clear()
  }

  openPopup (id, options = {}) {
    const featurePopup = this.map_.get('featurePopup')
    const feature = this.source_.getFeatureById(id)
    featurePopup.setFeature(feature, feature.getStyle())
    featurePopup.setVisible(true)
    if (options.center !== false) {
      featurePopup.centerMapOnPopup()
    }
  }

  getExtent () {
    return this.source_.getExtent()
  }
}
