import Feature from 'ol/Feature'
import WKT from 'ol/format/WKT'
import Point from 'ol/geom/Point'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

export class PlacesAPI {
  constructor (mainAPI, map) {
    this.mainAPI_ = mainAPI
    this.map_ = map
    this.possiblePlaces_ = []
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

    const id = options.id === undefined ? this.nextId++ : options.id

    const feature = new Feature(geom)
    feature.setId(id)
    feature.set('name', title)
    feature.set('description', popuptext)
    feature.setStyle(style)
    styling.manageFeature(feature)

    this.possiblePlaces_.push(feature)

    if (options.active === undefined || options.active) {
      this.source_.addFeature(feature)
    }

    return id
  }

  activate (id) {
    this.source_.addFeature(this.possiblePlaces_.find(f => f.getId() === id))
  }

  deactivate (id) {
    this.source_.removeFeature(this.possiblePlaces_.find(f => f.getId() === id))
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

  closePopup () {
    this.map_.get('featurePopup').setVisible(false)
  }

  getExtent () {
    return this.source_.getExtent()
  }

  onPopup (callback) {
    const featurePopup = this.map_.get('featurePopup')
    featurePopup.on('change:visible', () => {
      if (featurePopup.getVisible()) {
        const feature = featurePopup.getFeature()
        const found = this.possiblePlaces_.find(f => f === feature)
        if (found) {
          callback(found.getId())
        }
      }
    })
  }
}
