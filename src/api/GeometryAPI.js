import $ from 'jquery'
import Collection from 'ol/Collection'
import WKT from 'ol/format/WKT'
import { fromCircle } from 'ol/geom/Polygon'
import Draw from 'ol/interaction/Draw'
import Modify from 'ol/interaction/Modify'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { cssClasses } from '../globals'

export class GeometryAPI {
  constructor (mainAPI, map) {
    this.mainAPI_ = mainAPI
    this.map_ = map

    this.lastId_ = 0
    this.wktParser_ = new WKT()
  }

  drawGeometry (type, options = {}) {
    this.mainAPI_.cancelInteractions()

    const collection = new Collection()
    const style = this.map_.get('styling').getStyle(options.style || this.mainAPI_.getDrawStyle())
    this.map_.get('styling').manageFeatureCollection(collection)

    const interaction = new Draw({
      features: collection,
      type: type,
      style: style
    })

    this.map_.addSupersedingInteraction('singleclick dblclick pointermove', interaction)

    $(this.map_.getViewport()).addClass(cssClasses.crosshair)

    return new Promise((resolve, reject) => {
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
        let geom = e.feature.getGeometry()
        if (type === 'Circle') {
          geom = fromCircle(geom)
        }
        resolve(this.wktParser_.writeGeometry(geom, {
          dataProjection: this.map_.getView().getProjection(),
          featureProjection: options.srId || undefined
        }))
      })
    })
  }

  showGeometry (geometryWKT, options = {}) {
    if (!this.geometrySource_) {
      this.geometrySource_ = new VectorSource({
        useSpatialIndex: false
      })
      this.map_.addLayer(new VectorLayer({
        source: this.geometrySource_
      }))
      this.modifyCollection_ = new Collection()

      const style = this.map_.get('styling').getStyle(options.style || this.mainAPI_.getDrawStyle())
      this.map_.get('styling').manageFeatureCollection(this.modifyCollection_)

      this.modifyGeometryInteraction_ = new Modify({
        features: this.modifyCollection_,
        style
      })
      this.map_.addDefaultInteraction('singleclick', this.modifyGeometryInteraction_)
      this.modifyGeometryInteraction_.setActive(true)
    }

    const id = ++this.lastId_
    const feature = this.wktParser_.readFeature(geometryWKT)
    feature.setId(id)
    this.geometrySource_.addFeature(feature)

    if (options.modifyable) {
      this.modifyCollection_.add(feature)
    }

    return id
  }

  getGeometry (id) {
    return this.wktParser_.writeFeature(this.geometrySource_.getFeatureById(id))
  }

  hideGeometry (id) {
    this.geometrySource_.removeFeature(this.geometrySource_.getFeatureById(id))
  }
}
